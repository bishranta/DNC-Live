import { HiMapPin, HiEnvelope, HiPhone } from "react-icons/hi2";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#121652] text-white">
      <div className="h-1.5 bg-gradient-to-r from-dnc-blue via-dnc-orange to-dnc-red" />

      <Container className="pt-10 pb-6">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="flex flex-col items-start gap-4 text-left md:flex-row md:items-start md:text-left lg:col-span-2">
            <img src="/logo-white.png" alt="Digital Nepal Logo" className="h-20 shrink-0" />
            <p className="text-sm leading-relaxed text-slate-300">
              <strong>ICT Foundation Nepal</strong> is a non-profit organization promoting ICT,
              innovation, entrepreneurship, and digital transformation in Nepal. It organizes the
              flagship <strong>Digital Nepal Conclave</strong>, a national platform for shaping
              Nepal's digital future.
            </p>
          </div>

          {/* spacer */}
          <div className="hidden lg:block" />

          {/* Location & Contact */}
          <div className="space-y-3">
            {/* <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Office Location &amp; Contact
            </h4> */}

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <HiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-dnc-orange" />
                <span>Sankhamul, Kathmandu-31, Nepal</span>
              </div>

              <div className="flex items-start gap-2">
                <HiEnvelope className="mt-0.5 h-4 w-4 shrink-0 text-dnc-orange" />
                <span className="select-all">admin@ictfoundation.org.np</span>
              </div>

              <div className="flex items-start gap-2">
                <HiPhone className="mt-0.5 h-4 w-4 shrink-0 text-dnc-orange" />
                <span className="select-all">01-5971958 | +977 9851141348</span>
              </div>
            </div>

            <div className="flex gap-2.5 pt-1">
              <a
                href="https://www.facebook.com/digitalconclave"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-800 p-2 text-slate-300 shadow-xs transition-all duration-200 hover:bg-dnc-blue hover:text-white"
                title="Follow DNC on Facebook"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/digitalnepalconclave/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-800 p-2 text-slate-300 shadow-xs transition-all duration-200 hover:bg-dnc-orange hover:text-white"
                title="Follow DNC on Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/digital-nepal-conclave"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-800 p-2 text-slate-300 shadow-xs transition-all duration-200 hover:bg-dnc-blue-light hover:text-white"
                title="DNC LinkedIn Company Page"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@ict.foundation"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-800 p-2 text-slate-300 shadow-xs transition-all duration-200 hover:bg-dnc-red hover:text-white"
                title="Tune in to official IFN Channel on Youtube"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-slate-700 pt-6 text-sm text-slate-400 sm:flex-row">
          <p>&copy; Digital Nepal Conclave {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
