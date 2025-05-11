import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, Music } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-blue-500/20 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-display">DJ KALSER</h3>
            <p className="text-gray-400 mb-4 font-body">
              Creating unforgettable musical experiences for every occasion.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/40 transition-colors duration-300 border border-blue-500/30 neon-box"
              >
                <Facebook className="h-5 w-5 text-blue-400" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/40 transition-colors duration-300 border border-blue-500/30 neon-box"
              >
                <Instagram className="h-5 w-5 text-blue-400" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/40 transition-colors duration-300 border border-blue-500/30 neon-box"
              >
                <Twitter className="h-5 w-5 text-blue-400" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/40 transition-colors duration-300 border border-blue-500/30 neon-box"
              >
                <Music className="h-5 w-5 text-blue-400" />
                <span className="sr-only">SoundCloud</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">
              Quick Links
            </h3>
            <ul className="space-y-2 font-body">
              {["Home", "About", "Services", "Gallery", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
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
            <h3 className="text-lg font-semibold mb-4 font-display">
              Services
            </h3>
            <ul className="space-y-2 font-body">
              {[
                "Wedding Events",
                "Club Events",
                "Private Parties",
                "Sound Equipment",
                "Lighting Services",
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
            <h3 className="text-lg font-semibold mb-4 font-display">Contact</h3>
            <ul className="space-y-3 font-body">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-500" />
                <span className="text-gray-400">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-500" />
                <a
                  href="mailto:info@djkalser.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  info@djkalser.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm font-body">
          <p>
            &copy; {new Date().getFullYear()} DJ Kalser. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
