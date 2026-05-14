import Button from "@/components/Layouts/Button";

export default function NotFound() {
  return (
    <div
      data-page="not-found"
      className="section min-h-screen lg:min-h-[110vh] w-full flex items-center justify-center bg-(--color-accent) px-6"
    >
      <div className="text-center flex flex-col items-center gap-5 max-w-[600px]">
        {/* 404 */}
        <h1 className="text-h1-primary text-[160px]! lg:text-[250px]! text-(--color-secondary)">
          404
        </h1>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h2 className="text-h3-primary text-(--color-secondary)">
            Oops! Page not found
          </h2>
          <p className="text-body text-(--text-primary)">
            The page you are looking for doesn’t exist or has been removed.
          </p>
        </div>

        {/* Button */}
        <Button text={"Back to home"} href={"/"} />
      </div>
    </div>
  );
}
