import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Loader2, Send } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { z } from "zod";

const phoneRegex = /^([+]?48)?[ -]?(\d{3})[ -]?(\d{3})[ -]?(\d{3})$/;

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Podaj imię i nazwisko")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Podaj pełne imię i nazwisko (min. 2 słowa)",
    }),
  email: z.string().email("Nieprawidłowy adres e-mail"),
  phone: z
    .string()
    .min(9, "Podaj numer telefonu")
    .regex(phoneRegex, "Nieprawidłowy numer telefonu"),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć min. 10 znaków")
    .max(1000, "Wiadomość jest za długa (max 1000 znaków)"),
});

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

export function ContactSection({
  contactRef,
}: {
  contactRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateField = (name: keyof FormData, value: string) => {
    try {
      formSchema.shape[name].parse(value);
      // Remove error for this field if it passes validation
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(newErrors);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors((prev) => ({ ...prev, [name]: error.issues[0].message }));
      }
      return false;
    }
  };

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setFormErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    validateField(id as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    if (!validateForm()) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
      return;
    }

    setFormStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setFormErrors({});
      setRecaptchaToken(null); // ← opcjonalnie resetuj token

      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <section
      ref={contactRef}
      id="contact"
      className="py-24 section-transition-5"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display font-Audiowide">
            Kontakt
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-body md:text-xl">
            Skontaktuj się, aby zarezerwować swoje wydarzenie lub zapytać o
            usługi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 font-display md:text-2xl">
              Skontaktuj się
            </h3>
            <p className="text-gray-300 mb-8 font-body md:text-lg">
              Masz pytania dotyczące moich usług lub chcesz zarezerwować termin
              na swoje wydarzenie? Wypełnij formularz lub skontaktuj się ze mną
              bezpośrednio, korzystając z poniższych danych.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 border border-blue-500/30 neon-box">
                  <Phone className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white font-display md:text-2xl">
                    Telefon
                  </h4>
                  <p className="text-gray-300 font-body md:text-lg">
                    +48 515 255 477
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 border border-blue-500/30 neon-box">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white font-display md:text-2xl">
                    Email
                  </h4>
                  <p className="text-gray-300 font-body md:text-lg  ">
                    hak73@op.pl
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 border border-blue-500/30 neon-box">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-white font-display md:text-2xl">
                    Lokalizacja
                  </h4>
                  <p className="text-gray-300 font-body md:text-lg">
                    Kęty, Oświecim, Bielsko-Biała I okolice
                    <br />
                    Wszystko do ustalenia
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-900/20 rounded-xl border border-blue-500/20 p-8 neon-box "
          >
            <h3 className="text-xl font-bold mb-6 font-display">
              Wyślij wiadomość
            </h3>

            {/* --- FORMULARZ --- */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-300 font-body md:text-lg"
                  >
                    Imię i nazwisko
                  </label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Imię i nazwisko"
                    className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-500 font-body"
                    required
                  />
                  {formErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-300 font-body md:text-lg"
                  >
                    Adres e-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Twój e-mail"
                    className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-500 font-body"
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-300 font-body md:text-lg"
                  >
                    Numer telefonu
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Twój numer telefonu"
                    className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-500 font-body"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setRecaptchaToken(token)}
                className="mx-auto"
              />
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-300 font-body md:text-lg"
                >
                  Wiadomość
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Opowiedz mi o swoim wydarzeniu..."
                  rows={4}
                  className="bg-black/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-500 font-body"
                  required
                />
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white neon-box font-body md:text-1000"
                disabled={formStatus === "loading"}
              >
                {formStatus === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Wysyłanie...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Wyślij wiadomość
                  </>
                )}
              </Button>
              {formStatus === "success" && (
                <p className="text-green-500 text-sm text-center md:text-lg">
                  Wiadomość wysłana pomyślnie! Skontaktemy się z Tobą wkrótce.
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-red-500 text-sm text-center md:text-lg">
                  Nie udało się wysłać wiadomości. Sprawdź formularz i spróbuj
                  ponownie.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
