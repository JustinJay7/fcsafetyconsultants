import { useState, useEffect, useCallback } from "react";
import hero1 from "@/assets/hero-1-hd.jpg";
import hero2 from "@/assets/hero-2-hd.jpg";
import hero3 from "@/assets/hero-3-hd.jpg";
import hero4 from "@/assets/hero-4-hd.jpg";
import hero5 from "@/assets/hero-5-hd.jpg";
import hero6 from "@/assets/hero-6-hd.jpg";

const slides = [
  { src: hero1, alt: "FC Safety team reviewing site plans" },
  { src: hero2, alt: "FC Safety Consultants team on construction site" },
  { src: hero3, alt: "Safety officer inspecting building site" },
  { src: hero4, alt: "Construction site scaffolding inspection" },
  { src: hero5, alt: "Safety officer reviewing documentation" },
  { src: hero6, alt: "Construction site safety overview" },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  const goTo = useCallback((index: number) => setCurrent(index), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="w-full bg-secondary"
      style={{ marginTop: "64px", padding: "clamp(12px, 2.5vw, 32px)" }}
    >
      <div
        className="relative mx-auto w-full overflow-hidden rounded-xl shadow-2xl"
        style={{
          height: "clamp(260px, 52vh, 480px)",
          maxWidth: "1400px",
          border: "3px solid hsl(24 95% 53% / 0.6)",
          boxShadow:
            "0 0 0 6px hsl(222 47% 11%), 0 20px 60px -15px rgba(0,0,0,0.5)",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 will-change-[opacity]"
            style={{
              opacity: i === current ? 1 : 0,
              transition: "opacity 800ms ease-in-out",
              zIndex: i === current ? 1 : 0,
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "sync" : "async"}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 35%" }}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <h1
            className="font-display text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-lg mb-3"
            style={{
              lineHeight: "1.1",
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            FC Safety Consultants
          </h1>
          <p
            className="font-display text-base font-semibold text-white sm:text-lg md:text-xl max-w-2xl"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            Your Trusted Health &amp; Safety Consultant
          </p>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="h-2.5 w-2.5 rounded-full border border-white/40 transition-all duration-300"
              style={{
                backgroundColor:
                  i === current
                    ? "hsl(var(--primary))"
                    : "rgba(255,255,255,0.45)",
                transform: i === current ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlideshow;
