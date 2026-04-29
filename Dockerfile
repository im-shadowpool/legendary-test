# 1. Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# 2. Build the app
FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

# 3. Run the app (production image)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user (security best practice)
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy only required files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]