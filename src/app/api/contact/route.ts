import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// CORS preflight handler
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://djklaser.com",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, message, recaptchaToken } =
      await req.json();

    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Brak tokenu reCAPTCHA." },
        { status: 400, headers: { "Access-Control-Allow-Origin": "https://djklaser.com" } }
      );
    }

    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "Weryfikacja reCAPTCHA nie powiodła się." },
        { status: 400, headers: { "Access-Control-Allow-Origin": "https://djklaser.com" } }
      );
    }

    const requiredEnvVars = [
      "SMTP_HOST",
      "SMTP_PORT",
      "SMTP_USER",
      "SMTP_PASSWORD",
      "SMTP_FROM_EMAIL",
      "SMTP_TO_EMAIL",
    ];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Brak wymaganej zmiennej środowiskowej: ${envVar}`);
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    try {
      await transporter.verify();
    } catch (verifyError: unknown) {
      if (verifyError instanceof Error) {
        console.error("Błąd weryfikacji SMTP:", verifyError.message);
      } else {
        console.error("Błąd weryfikacji SMTP:", verifyError);
      }
      return NextResponse.json(
        { error: "Nie udało się połączyć z serwerem poczty e-mail." },
        { status: 500, headers: { "Access-Control-Allow-Origin": "https://djklaser.com" } }
      );
    }

    function escapeHtml(input: string) {
      return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    const sanitizedFullName = escapeHtml(fullName);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedPhone = escapeHtml(phone);
    const sanitizedMessage = escapeHtml(message);

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: `[Formularz kontaktowy] - od ${sanitizedFullName}`,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${sanitizedFullName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Telefon:</strong> ${sanitizedPhone}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: sanitizedEmail,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Wiadomość została wysłana pomyślnie." },
      { status: 200, headers: { "Access-Control-Allow-Origin": "https://djklaser.com" } }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Błąd podczas wysyłania e-maila:", error.message);

      const errorMessage = error.message;

      return NextResponse.json(
        { error: errorMessage },
        { status: 500, headers: { "Access-Control-Allow-Origin": "https://djklaser.com" } }
      );
    } else {
      console.error("Błąd podczas wysyłania e-maila:", error);

      return NextResponse.json(
        { error: "Wystąpił nieznany błąd podczas wysyłania wiadomości." },
        { status: 500, headers: { "Access-Control-Allow-Origin": "https://djklaser.com" } }
      );
    }
  }
}
