import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const formData = await req.formData();

    // TEXT FIELDS
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const source = formData.get("source") as string;
    const message = formData.get("message") as string;
    const fullAddress = formData.get("fullAddress") as string;
    const suburb = formData.get("suburb") as string;
    const statePostcode = formData.get("statePostcode") as string;
    const slug = formData.get("slug") as string;
    const captchaToken = formData.get("captchaToken") as string;

    // FILES
    const photo1 = formData.get("photo1") as File | null;
    const photo2 = formData.get("photo2") as File | null;

    if (
      !fullName ||
      !email ||
      !phone ||
      !fullAddress ||
      !suburb ||
      !statePostcode
    ) {
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
    // console.log("Captcha response:", captchaData);

    if (!captchaData.success) {
      return NextResponse.json(
        { success: false, error: "Captcha verification failed" },
        { status: 403 },
      );
    }

    // FILE -> BASE64 CONVERTER
    const convertToBase64 = async (file: File | null) => {
      if (!file) return null;

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      return {
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        base64: buffer.toString("base64"),
      };
    };

    // CONVERT FILES
    const photo1Data = await convertToBase64(photo1);
    const photo2Data = await convertToBase64(photo2);

    const token = process.env.WP_SAMPLE_CONTACT_API_KEY
      ? process.env.WP_SAMPLE_CONTACT_API_KEY
      : "photo_contact_saOYEheOcg80BEdMCMiGpueb2oVRWdjk";

    const wpRes = await fetch(
      "https://cms-magnetme.teamelephant.me/wp-json/magnet/v1/contact",
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
          source,
          message,
          fullAddress,
          suburb,
          statePostcode,
          slug,

          // FILES
          photo1: photo1Data,
          photo2: photo2Data,
        }),
      },
    );

    console.log(wpRes);

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
