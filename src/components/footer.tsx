import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type React from "react";

export interface FooterSection {
  id: string;
  label: string;
  ref?: React.RefObject<HTMLDivElement | null>;
  href?: string; // np. /gallery
}

interface FooterProps {
  sections: FooterSection[];
}

export default function Footer({ sections }: FooterProps) {
  // Funkcja smooth scroll
  const safeScrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-black border-t border-blue-500/20 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-display">
              DJ{" "}
              <span className="gradient-text neon-blue font-Audiowide">
                Klaser
              </span>
            </h3>
            <p className="text-gray-400 mb-4 font-body">
              Tworzę niezapomniane muzyczne doświadczenia na każdą okazję.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">
              Szybkie linki
            </h3>
            <ul className="space-y-2 font-body">
              {sections.map(({ id, label, ref, href }) => (
                <li key={id}>
                  {ref ? (
                    <button
                      type="button"
                      className="text-gray-400 hover:text-blue-400 transition-colors bg-transparent border-0 p-0 cursor-pointer"
                      onClick={() => safeScrollToSection(ref)}
                    >
                      {label}
                    </button>
                  ) : (
                    <Link
                      href={href || "/"}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
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
                  <button
                    type="button"
                    className="text-gray-400 hover:text-blue-400 transition-colors bg-transparent border-0 p-0 cursor-pointer"
                    onClick={() => {
                      const section = sections.find((s) => s.id === "services");
                      if (section?.ref) safeScrollToSection(section.ref);
                    }}
                  >
                    {item}
                  </button>
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
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold font-display">DJ</span>{" "}
            <span className="gradient-text neon-blue font-Audiowide">
              Klaser
            </span>
            . Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
