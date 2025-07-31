import { motion } from "framer-motion";
import { Calendar, Users, Music, Headphones, Disc } from "lucide-react";
import Image from "next/image";
import React from "react";

export function ServicesSection({
  servicesRef,
}: {
  servicesRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
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
                src="https://res.cloudinary.com/dscvxyjvn/image/upload/w_auto,q_auto,f_auto/v1751902097/IMG_5237_abvukn.jpg"
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
  );
}
