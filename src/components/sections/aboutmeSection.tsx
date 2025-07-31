import { motion } from "framer-motion";
import { Award, Headset, Star, UserCheck } from "lucide-react";

export function AboutMeSection() {
  return (
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
  );
}
