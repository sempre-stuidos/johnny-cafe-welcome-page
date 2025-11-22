import { Phone, Instagram, Mail } from "lucide-react";
import content from "@/data/content.json";

// Facebook icon component since lucide-react deprecated it
const Facebook = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// TikTok icon component since lucide-react doesn't have it
const TikTok = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const iconMap = {
  Email: Mail,
  Instagram,
  Facebook,
  TikTok,
};

export default function Home() {
  const { restaurant, opening, hours, reservations, social, footer } = content;
  return (
    <main className="h-screen min-h-screen text-[#B29738] relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/imgs/background-pattern.png')" }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('/vintage-paper-texture.png')] bg-repeat mix-blend-overlay" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#011A0C]/80" />

      {/* Content */}
      <div className="h-full flex flex-col items-center justify-between px-6 pt-12 pb-6 bg-[#011A0C]/10 backdrop-blur-sm">

        {/* Main heading */}
        <div className="text-center space-y-4">
          <h1 className="font-[family-name:var(--font-yellowtail)] text-7xl md:text-8xl lg:text-9xl tracking-wider text-[#B29738] drop-shadow-[0_0_30px_rgba(178,151,56,0.3)]">
            {restaurant.name}
          </h1>
          <p className="font-serif text-xl md:text-2xl italic tracking-wide text-[#B29738]/80">Est. {restaurant.established}</p>
        </div>

        {/* Coming Soon */}
        <div>
          <h2 className="font-[family-name:var(--font-fjalla-one)] text-3xl md:text-4xl text-center mb-4 text-balance">{opening.heading}</h2>
        </div>

        {/* Hours & Info */}
        <div className="w-full ">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Breakfast Hours */}
            <div className="text-center space-y-3">
              <h3 className="font-display text-2xl text-[#B29738] tracking-wide">{hours.breakfast.title}</h3>
              <div className="h-px bg-[#B29738]/30 max-w-[120px] mx-auto" />
              <div className="font-sans text-[#8a7329] space-y-1">
                <p className="text-xl font-light">{hours.breakfast.time}</p>
              </div>
            </div>

            {/* Dinner Hours */}
            <div className="text-center space-y-3">
              <h3 className="font-display text-2xl text-[#B29738] tracking-wide">{hours.dinner.title}</h3>
              <div className="h-px bg-[#B29738]/30 max-w-[120px] mx-auto" />
              <div className="font-sans text-[#8a7329] space-y-1">
                <p className="text-xl font-light">{hours.dinner.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reservations */}
        <div className="text-center [animation-delay:800ms]">
          <p className="font-serif text-lg mb-4 text-[#B29738]/90">{reservations.text}</p>
          <a
            href={`tel:${reservations.phone.tel}`}
            className="inline-flex items-center gap-3 border-2 border-[#B29738] bg-transparent text-[#B29738] hover:bg-[#B29738] hover:text-[#011A0C] transition-all duration-300 font-sans tracking-wider text-lg px-8 py-4 rounded-lg group"
          >
            <Phone className="w-5 h-5 group-hover:animate-pulse" />
            {reservations.phone.display}
          </a>
        </div>

        {/* Social Media */}
        <div className="pb-4 text-center space-y-6">
          <p className="font-serif text-sm tracking-widest uppercase text-[#8a7329]">{social.heading}</p>
          <div className="flex items-center justify-center gap-6">
            {social.links.map((link) => {
              const Icon = iconMap[link.platform as keyof typeof iconMap];
              const isEmail = link.platform === "Email";
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target={isEmail ? "_self" : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  className="group"
                  aria-label={link.ariaLabel}
                >
                  <div className="w-12 h-12 border border-[#B29738]/50 rounded-full flex items-center justify-center hover:bg-[#B29738] hover:border-[#B29738] transition-all duration-300">
                    {Icon && <Icon className="w-5 h-5 text-[#B29738] group-hover:text-[#011A0C] transition-colors" />}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
