import { motion } from "framer-motion";
import Image from "next/image";
import { Disc, Heart, Music } from "lucide-react";
import React from "react";

export interface AboutSectionProps {
  aboutRef: React.RefObject<HTMLDivElement | null>;
  scrollToSection?: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

export function AboutSection({ aboutRef }: AboutSectionProps) {
  return (
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
            Moja pasja szybko stała się zawodem, a każdy kolejny event to okazja
            do dalszego rozwoju i poszerzania muzycznego repertuaru.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-300 mb-6 font-body text-base md:text-xl"
          >
            Wierzę, że każde wydarzenie zasługuje na wyjątkową oprawę – dlatego
            przygotowuję indywidualne playlisty i dbam o atmosferę dopasowaną do
            oczekiwań moich klientów. Moim priorytetem jest, by parkiet był
            pełen przez całą noc!
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
            , aby zapewnić wyjątkową oprawę muzyczną i niezapomnianą zabawę dla
            wszystkich uczestników.
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
  );
}
