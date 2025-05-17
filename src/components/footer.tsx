import Link from "next/link";
import { Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-blue-500/20 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-display">
              DJ{" "}
              <span className="gradient-text neon-blue font-Audiowide">
                KALSER
              </span>
            </h3>
            <p className="text-gray-400 mb-4 font-body">
              Tworzę niezapomniane muzyczne doświadczenia na każdą okazję.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/krzysztof.haczek.3"
                className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/40 transition-colors duration-300 border border-blue-500/30 neon-box"
              >
                <Facebook className="h-5 w-5 text-blue-400" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">
              Szybkie linki
            </h3>
            <ul className="space-y-2 font-body">
              {["Strona główna", "O mnie", "Usługi", "Galeria", "Kontakt"].map(
                (item, idx) => (
                  <li key={item}>
                    <Link
                      href={
                        idx === 0
                          ? "/"
                          : `#${
                              ["about", "services", "gallery", "contact"][
                                idx - 1
                              ]
                            }`
                      }
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Usługi</h3>
            <ul className="space-y-2 font-body">
              {[
                "Wesela",
                "Imprezy klubowe",
                "Imprezy prywatne",
                "Nagłośnienie",
                "Oświetlenie",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Kontakt</h3>
            <ul className="space-y-3 font-body">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-gray-400">+48 515 255 477</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-500" />
                <a
                  href="mailto:hak73@op.pl"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  hak73@op.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm font-body">
          <p>
            &copy; {new Date().getFullYear()} DJ Kalser. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
