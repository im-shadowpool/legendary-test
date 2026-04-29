import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const {
      fullName,
      email,
      phone,
      guests,
      eventType,
      venue,
      date,
      time,
      source,
      message,
      slug,
      captchaToken,
    } = await req.json();

    if (!fullName || !email || !phone || !eventType || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!captchaToken) {
      return NextResponse.json(
        { success: false, error: "Captcha token missing" },
        { status: 400 },
      );
    }

    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: "6LeUEMgsAAAAAF_CkQnCAg4JCjZRixytaSjFKeo4",
          response: captchaToken,
        } as any),
      },
    );

    const captchaData = await captchaRes.json();
    console.log("Captcha response:", captchaData);

    if (!captchaData.success) {
      return NextResponse.json(
        { success: false, error: "Captcha verification failed" },
        { status: 403 },
      );
    }

    console.log(process.env.WP_CONTACT_API_KEY);

    const token = process.env.WP_CONTACT_API_KEY
      ? process.env.WP_CONTACT_API_KEY
      : "magnetme_contact_87F18886E8FD2BC1EB1799ABC3EB1";

    const wpRes = await fetch(
      "https://cms-magnetme.teamelephant.me/wp-json/custom-contact/v1/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          guests,
          eventType,
          venue,
          date,
          time,
          source,
          message,
          slug,
        }),
      },
    );

    if (!wpRes.ok) {
      const errorText = await wpRes.text();
      console.error("WP API Error:", errorText);

      return NextResponse.json(
        { success: false, error: "Failed to submit" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
