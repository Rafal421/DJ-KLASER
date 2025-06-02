"use client";

import type React from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  Music,
  Calendar,
  Headphones,
  Users,
  Disc,
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Send,
  Award,
  Headset,
  UserCheck,
  Star,
  Heart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/navbar";
import GalleryMasonry from "@/components/gallery-masonry";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(2, "Podaj imię i nazwisko"),
  email: z.string().email("Nieprawidłowy adres e-mail"),
  phone: z.string().optional(),
  message: z.string().min(10, "Wiadomość musi mieć min. 10 znaków"),
});

type FormData = {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
};

export default function Home() {
  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
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

  const sections: {
    id: string;
    ref: React.RefObject<HTMLDivElement | null>;
    label: string;
  }[] = [
    { id: "home", ref: homeRef, label: "Strona główna" },
    { id: "about", ref: aboutRef, label: "O mnie" },
    { id: "services", ref: servicesRef, label: "Usługi" },
    { id: "gallery", ref: galleryRef, label: "Galeria" },
    { id: "contact", ref: contactRef, label: "Kontakt" },
  ];

  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <div className="bg-black text-white min-h-screen w-full overflow-x-hidden relative">
      <Navbar sections={sections} />

      {/* Hero Section */}
      <section
        ref={homeRef}
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black z-10" />
          <video
            src="https://res.cloudinary.com/dscvxyjvn/video/upload/q_auto,f_auto/v1747138841/Untitled_axgkb1.mp4"
            autoPlay
            playsInline
            muted
            loop
            preload="auto"
            className="object-cover w-full h-full absolute top-0 left-0"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
          <h1 className="text-6xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-4 tracking-tighter font-display font-Audiowide flex items-center justify-center gap-[0.1em] sm:gap-[0.15em]">
            <span>DJ</span>
            <span className="gradient-text neon-blue">KLASER</span>
          </h1>
          <p className="text-lg sm:text-base md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300 font-body">
            Tworzę niezapomniane muzyczne doświadczenia na każdą okazję
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white neon-box font-body"
              onClick={() => scrollToSection(aboutRef)}
            >
              Odkryj stronę
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer"
          onClick={() => scrollToSection(aboutRef)}
        >
          <ChevronDown className="h-8 w-8 text-blue-500" />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-24 section-transition-1">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display font-Audiowide">
              O mnie
            </h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
          </motion.div>

          {/* Wide photo for About Me section - standardized aspect ratio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 relative w-full aspect-[21/9] rounded-xl overflow-hidden neon-box"
          >
            <Image
              src="https://res.cloudinary.com/dscvxyjvn/image/upload/w_auto,q_auto,f_auto/v1747140883/518-1-scaled_ftvf35.jpg"
              alt="DJ Klaser szeroki portret"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6 gradient-text font-display"
            >
              Architekt Dobrej Zabawy
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-4 font-body text-base md:text-xl"
            >
              Od ponad dekady z pasją tworzę niezapomniane wydarzenia muzyczne
              oraz imprezy okolicznościowe.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-4 font-body text-base md:text-xl "
            >
              Moja pasja szybko stała się zawodem, a każdy kolejny event to
              okazja do dalszego rozwoju i poszerzania muzycznego repertuaru.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-6 font-body text-base md:text-xl"
            >
              Wierzę, że każde wydarzenie zasługuje na wyjątkową oprawę –
              dlatego przygotowuję indywidualne playlisty i dbam o atmosferę
              dopasowaną do oczekiwań moich klientów. Moim priorytetem jest, by
              parkiet był pełen przez całą noc!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-6 font-body text-base md:text-xl"
            >
              Każda impreza to niepowtarzalne widowisko muzyczne, idealnie
              dopasowane do gustu i potrzeb klienta.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-6 font-body text-base md:text-xl"
            >
              Podczas dużych, rodzinnych imprez okolicznościowych występujemy w
              duecie{" "}
              <span className="font-semibold text-blue-400">
                DJ KLASER & DJ SZPILKA
              </span>
              , aby zapewnić wyjątkową oprawę muzyczną i niezapomnianą zabawę
              dla wszystkich uczestników.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 border border-blue-500/30 neon-box">
                  <Disc className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-white font-body text-base md:text-xl">
                    10+ lat
                  </p>
                  <p className="text-sm text-gray-400 font-body md:text-base">
                    Doświadczenia
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 border border-blue-500/30 neon-box">
                  <Music className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-white font-body md:text-xl">
                    100+
                  </p>
                  <p className="text-sm text-gray-400 font-body md:text-base">
                    Wydarzeń
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 border border-blue-500/30 neon-box">
                  <Heart className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-white font-body md:text-xl">
                    100+
                  </p>
                  <p className="text-sm text-gray-400 font-body md:text-base">
                    Zadowolonych klientów
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Makes Me Different Section */}
      <section className="py-24 section-transition-2">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display font-Audiowide">
              Co mnie <span className="gradient-text">wyróżnia?</span>
            </h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-body md:text-xl">
              Oferuję muzykę i oświetlenie wraz z profesjonalnym prowadzeniem
              imprez.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* High Quality Equipment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-6 rounded-lg border border-blue-500/20 neon-box"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Headset className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center font-display">
                SPRZĘT NAJWYŻSZEJ JAKOŚCI
              </h3>
              <p className="text-gray-300 text-center font-body">
                Systemy nagłośnienia i oświetlenia na najwyższym poziomie.
              </p>
            </motion.div>

            {/* Professionalism */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-6 rounded-lg border border-blue-500/20 neon-box"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Award className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center font-display">
                PROFESJONALIZM
              </h3>
              <p className="text-gray-300 text-center font-body ">
                Dbam o każdy szczegół, by Twoje wydarzenie przebiegło
                perfekcyjnie.
              </p>
            </motion.div>

            {/* Individual Approach */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-6 rounded-lg border border-blue-500/20 neon-box"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <UserCheck className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center font-display">
                INDYWIDUALNE PODEJŚCIE
              </h3>
              <p className="text-gray-300 text-center font-body">
                Rozmawiam z Tobą, by poznać Twoje oczekiwania i się do nich
                dostosować.
              </p>
            </motion.div>

            {/* Rich Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] p-6 rounded-lg border border-blue-500/20 neon-box"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center font-display">
                Wesela
              </h3>
              <p className="text-gray-300 text-center font-body">
                To magiczne wydarzenie wymaga szczególnej uwagi, dlatego
                poprawidzimy go dla Was w duecie. DJ KLASER & DJ SZPILKA.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        id="services"
        className="py-24 section-transition-3"
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
              Usługi
            </h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-body md:text-xl">
              Profesjonalne usługi DJ-skie dostosowane do potrzeb Twojego
              wydarzenia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Wedding Events */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-500/20 to-blue-900/30 p-8 rounded-xl border border-blue-500/30 backdrop-blur-sm neon-box"
              >
                <div className="mb-6">
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display md:text-4xl">
                  Wesela
                </h3>
                <p className="text-gray-300 mb-6 font-body md:text-xl">
                  Stwórz magiczne chwile w dniu swojego ślubu dzięki naszym
                  profesjonalnym usługom DJ-skim. Od romantycznych pierwszych
                  tańców po energetyczne sety taneczne.
                </p>
                <ul className="space-y-2">
                  {[
                    "Koordynacja muzyki podczas ceremonii",
                    "Muzyka w tle podczas przyjęcia i kolacji",
                    "Rozrywka na przyjęciu weselnym i parkiecie",
                    "Spersonalizowane playlisty dopasowane do Twoich preferencji",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                      <span className="text-gray-300 text-sm md:text-xl font-body">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Wedding Image - standardized aspect ratio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-[16/9] rounded-xl overflow-hidden neon-box "
              >
                <Image
                  src="https://res.cloudinary.com/dscvxyjvn/image/upload/w_auto,q_auto,f_auto/v1747141319/SS-444-min-1-scaled_zyi96m.jpg"
                  alt="Usługa DJ na wesele"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Private Parties */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-600/20 to-blue-900/30 p-8 rounded-xl border border-blue-600/30 backdrop-blur-sm neon-box"
              >
                <div className="mb-6">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display md:text-4xl">
                  Imprezy Prywatne
                </h3>
                <p className="text-gray-300 mb-6 font-body md:text-xl">
                  Spraw, by Twoje prywatne wydarzenie było niezapomniane dzięki
                  spersonalizowanej muzyce, która odpowiada nastrojowi i bawi
                  Twoich gości.
                </p>
                <ul className="space-y-2">
                  {[
                    "Imprezy urodzinowe i rocznice",
                    "Wydarzenia firmowe i premiery produktów",
                    "Imprezy świąteczne i okolicznościowe",
                    "Spersonalizowane playlisty i życzenia utworów",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                      <span className="text-gray-300 text-sm md:text-xl font-body">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Corporate Image - standardized aspect ratio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative aspect-[16/9] rounded-xl overflow-hidden neon-box mb-16"
              >
                <Image
                  src="https://res.cloudinary.com/dscvxyjvn/image/upload/w_auto,q_auto,f_auto/v1747138840/party_ing2lh.jpg"
                  alt="Wydarzenie firmowe"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Club Events */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-400/20 to-blue-900/30 p-8 rounded-xl border border-blue-400/30 backdrop-blur-sm neon-box"
              >
                <div className="mb-6">
                  <Music className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display md:text-4xl">
                  Wydarzenia Klubowe
                </h3>
                <p className="text-gray-300 mb-6 font-body md:text-xl">
                  Podnieś poziom swojej imprezy klubowej dzięki energetycznym
                  setom, które porwą tłumy do tańca. Specjalizuję się w muzyce
                  house, EDM, hip-hop i open format.
                </p>
                <ul className="space-y-2">
                  {[
                    "Energetyczne sety DJ-skie",
                    "Najnowocześniejsze nagłośnienie i oświetlenie",
                    "Interakcja z tłumem i odczytywanie jego potrzeb",
                    "Płynne przejścia i miksowanie",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="h-5 w-5 text-green-500 mr-2">✓</div>
                      <span className="text-gray-300 text-sm md:text-xl font-body">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Club Image - standardized aspect ratio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative aspect-[16/9] rounded-xl overflow-hidden neon-box"
              >
                <Image
                  src="https://res.cloudinary.com/dscvxyjvn/image/upload/v1748853619/IMG_1910_cp9hl8.jpg"
                  alt="Wydarzenie klubowe"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Equipment Section */}
          <div className="mt-20">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-8 text-center font-display font-Audiowide"
            >
              Sprzęt premium
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Nagłośnienie",
                  icon: <Headphones className="h-6 w-6 text-blue-500" />,
                  description: <>Turbosound INSPIRE IP3000</>,
                  color: "from-blue-500/20 to-blue-900/30 ",
                  border: "border-blue-500/30",
                },
                {
                  title: "Oświetlenie",
                  icon: <Disc className="h-6 w-6 text-blue-500" />,
                  description:
                    "Dynamiczne efekty świetlne, w tym ruchome głowy, lasery i efekty atmosferyczne.",
                  color: "from-blue-500/20 to-blue-900/30",
                  border: "border-blue-500/30",
                },
                {
                  title: "Sprzęt DJ-ski",
                  icon: <Music className="h-6 w-6 text-blue-500" />,
                  description: "Denon DJ Prime 4+",
                  color: "from-blue-500/20 to-blue-900/30",
                  border: "border-blue-500/30",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${item.color} p-6 rounded-lg ${item.border} neon-box`}
                >
                  <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-medium md:text-xl mb-2 font-display">
                    {item.title}
                  </h4>
                  <p className="text-gray-300 text-basic md:text-lg font-body">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        ref={galleryRef}
        id="gallery"
        className="py-24 section-transition-4"
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
              Galeria
            </h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-body md:text-xl">
              Chwile uchwycone z niezapomnianych wydarzeń i występów
            </p>
          </motion.div>

          <GalleryMasonry />

          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white neon-box font-body md:text-medium"
              asChild
            >
              <Link href="/gallery">
                Zobacz pełną galerię
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className="py-24 scetion-transition-5"
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
                Masz pytania dotyczące moich usług lub chcesz zarezerwować
                termin na swoje wydarzenie? Wypełnij formularz lub skontaktuj
                się ze mną bezpośrednio, korzystając z poniższych danych.
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
                    Wiadomość wysłana pomyślnie! Skontaktujemy się z Tobą
                    wkrótce.
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

      {/* Footer - Using the new Footer component */}
      <Footer sections={sections} />
    </div>
  );
}
