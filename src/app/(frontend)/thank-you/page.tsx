import Button from "@/components/Layouts/Button";

export default function ThankYouPage() {
  return (
    <section className="section pt-[196px] pb-[120px] bg-(--color-accent) overflow-hidden">
      <div className="custom-container flex flex-col gap-12 items-center">
        {/* Header */}
        <div className="flex-center-col gap-2 text-center">
          <h2 className="text-h1-primary text-(--color-brand)">Thank you!</h2>
          <p className="faq-question-text text-(--color-secondary)">
            Your Event Enquiry Has Been Received
          </p>
        </div>
        {/* Images */}
        <div className="relative flex items-center justify-center overflow-hidden">
          {/* Card 1 */}
          <div className="relative w-[130px] lg:w-[280px] rotate-[-6deg] hover:rotate-0 transition-all duration-300 shadow-xl rounded-md overflow-hidden bg-white">
            <img
              src="https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/thankyou-2.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 2 (center bigger) */}
          <div className="relative w-[130px] lg:w-[280px] rotate-[2deg] hover:rotate-0 transition-all duration-300 shadow-2xl rounded-md overflow-hidden bg-white z-10">
            <img
              src="https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/thankyou-1.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 3 */}
          <div className="relative w-[130px] lg:w-[280px] rotate-[-2deg] hover:rotate-0 transition-all duration-300 shadow-xl rounded-md overflow-hidden bg-white">
            <img
              src="https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/thankyou-3.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card 4 */}
          <div className="relative w-[130px] lg:w-[280px] rotate-[5deg] hover:rotate-0 transition-all duration-300 shadow-xl rounded-md overflow-hidden bg-white">
            <img
              src="https://cms-magnetme.teamelephant.me/wp-content/uploads/2026/04/thankyou-4.webp"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Footer */}
        <div className="flex-center-col gap-6 text-center">
          <p className="text-body text-(--text-primary) w-[75%]">
            We’re delighted you’re interested in exploring opportunities with
            Magnet-Me. We receive a large number of enquiries but will be in
            touch with further information as soon as possible.
          </p>
          <div className="relative">
            <Button text="return to home" href="/" />
          </div>
        </div>
      </div>
    </section>
  );
}
