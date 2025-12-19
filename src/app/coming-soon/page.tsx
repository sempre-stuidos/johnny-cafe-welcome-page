import { Phone, Instagram, Mail, Music } from "lucide-react";
import content from "@/data/content.json";
import { cn } from "@/lib/utils";
import { DecorativeLine, Facebook, TikTok } from "@/components/icons";

const iconMap = {
  Email: Mail,
  Instagram,
  Facebook,
  TikTok,
};

export default function ComingSoonPage() {
  const { restaurant, opening, hours, reservations, social, footer } = content;
  return (
    <main
      className={cn(
        "h-screen min-h-screen text-[#B29738] relative overflow-hidden",
        "bg-cover bg-center bg-no-repeat"
      )}
      style={{ backgroundImage: "url('/assets/imgs/background-pattern.png')" }}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('/vintage-paper-texture.png')] bg-no-repeat bg-cover mix-blend-overlay" />
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#011A0C]/80" />

      {/* Content */}
      <div className="h-full w-full bg-[#011A0C]/10 backdrop-blur-sm">
        <div className="h-full w-full flex flex-col items-center">
          <div
            className={cn(
              "max-w-[1000px] w-[calc(100%-20px)] md:w-auto",
              "h-full flex flex-col items-center justify-between",
              "bg-[#011A0C]/70 backdrop-blur-lg",
              "px-2 md:px-6 pt-4 md:pt-12 my-4 mx-4 pb-2 md:pb-6",
              "border-4 border-[#B29738]",
              "shadow-[0_0_20px_rgba(178,151,56,0.5),0_0_40px_rgba(178,151,56,0.3)]"
            )}
          >
            <div className="relative text-center space-y-2 md:space-y-4">
              <h1
                className={cn(
                  "font-yellowtail text-5xl md:text-8xl tracking-wider",
                  "text-[#B29738] drop-shadow-[0_0_30px_rgba(178,151,56,0.3)]"
                )}
              >
                {restaurant.name}
              </h1>
              <p className="font-serif text-xl md:text-2xl italic tracking-wide text-[#B29738]/80">
                Est. {restaurant.established}
              </p>
              <DecorativeLine className="absolute top-30 md:top-40 w-full h-auto" />
            </div>

            {/* Coming Soon */}
            <div className="relative">
              <h2
                className={cn(
                  "font-fjalla-one text-3xl md:text-4xl text-center mb-4 text-balance"
                )}
              >
                {opening.heading}
                <span className="text-5xl md:text-7xl italic">
                  {" "}
                  {opening.highlight}
                </span>
              </h2>
            </div>

            {/* Hours & Info */}
            <div className="w-full relative">
              <div className="absolute w-full bottom-[180px] md:bottom-30 left-0 flex items-center justify-center gap-4">
                <div className="h-px w-full bg-linear-to-r from-transparent to-[#B29738]"></div>
                <Music className="w-20 h-20 text-[#B29738]" />
                <div className="h-px w-full bg-linear-to-l from-transparent to-[#B29738]"></div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-between font-fjalla-one">
                {/* Breakfast Hours */}
                <div className="text-center">
                  <h3 className="text-2xl text-[#B29738] tracking-wide">
                    {hours.breakfast.title}
                  </h3>
                  <div className="h-px bg-[#B29738]/30 max-w-10 md:max-w-14 my-2 mx-auto" />
                  <p className="text-md md:text-xl text-[#8a7329] font-light">
                    {hours.breakfast.time}
                  </p>
                </div>
                <div className="flex items-center justify-center"></div>
                {/* Dinner Hours */}
                <div className="text-center">
                  <h3 className="font-display text-2xl text-[#B29738] tracking-wide">
                    {hours.dinner.title}
                  </h3>
                  <div className="h-px bg-[#B29738]/30 max-w-10 md:max-w-14 my-2 mx-auto" />
                  <p className="text-md md:text-xl text-[#8a7329] font-light">
                    {hours.dinner.time}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer with Phone and Social Icons */}
            <footer className="relative w-full pb-2 md:pb-4">
              <DecorativeLine className="absolute -top-12 md:-top-20 w-full h-auto rotate-180" />
              <div className="flex justify-between items-center gap-4">
                {/* Phone and Social Icons Row */}
                <div className="flex gap-10">
                  {/* Phone Number */}
                  <a
                    href={`tel:${reservations.phone.tel}`}
                    className={cn(
                      "inline-flex items-center gap-2 pr-4 pb-2",
                      "font-fjalla-one text-[#B29738] ",
                      "border-b-[3px]  border-r-[3px] border-[#B29738] transition-colors group rounded-br-full",
                      "hover:border-b-[3px] hover:border-r-[3px] hover:border-b-[#B29738]/80 hover:border-r-[#B29738]/80 hover:text-[#B29738]/80"
                    )}
                  >
                    <Phone className="w-12 h-12 mr-4 md:pr-0 md:w-10 md:h-10 group-hover:animate-pulse" />
                    <span className="hidden md:block md:text-xxl font-medium tracking-wide">
                      {reservations.phone.display}
                    </span>
                  </a>
                </div>
                <div className="flex justify-between gap-4 flex-wrap">
                  {/* Social Icons */}
                  <div className="flex items-center justify-center gap-3">
                    {social.links.map((link) => {
                      const Icon =
                        iconMap[link.platform as keyof typeof iconMap];
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
                          <div
                            className={cn(
                              "w-10 h-10 border border-[#B29738]/50 rounded-full",
                              "flex items-center justify-center",
                              "hover:bg-[#B29738] hover:border-[#B29738] transition-all duration-300"
                            )}
                          >
                            {Icon && (
                              <Icon
                                className={cn(
                                  "w-6 h-6 text-[#B29738]",
                                  "group-hover:text-[#011A0C] transition-colors"
                                )}
                              />
                            )}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}

