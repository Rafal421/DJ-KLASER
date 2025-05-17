import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, message } = await req.json();

    // Sprawdź wymagane zmienne środowiskowe SMTP
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

    // Utwórz transporter SMTP z ustawieniami timeout
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465", // true dla 465, false dla innych portów
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Weryfikacja połączenia SMTP
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("Błąd weryfikacji SMTP:", verifyError);
      return NextResponse.json(
        { error: "Nie udało się połączyć z serwerem poczty e-mail." },
        { status: 500 }
      );
    }

    // Treść e-maila
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: `[Formularz kontaktowy ze strony] - od ${fullName}`,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    };

    // Wyślij e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Wiadomość została wysłana pomyślnie." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Błąd podczas wysyłania e-maila:", error);

    // Bardziej szczegółowy komunikat o błędzie
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Wystąpił nieznany błąd podczas wysyłania wiadomości.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
