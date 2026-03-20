import { useState, useEffect } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3-hd.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
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
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden pt-16 bg-secondary">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center px-4 md:px-8"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="h-full w-full rounded-lg object-cover object-center"
          />
          <div className="absolute inset-x-4 md:inset-x-8 inset-y-0 bg-secondary/30 rounded-lg" />
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-4xl font-extrabold text-primary md:text-6xl lg:text-7xl drop-shadow-lg mb-4">
          FC Safety Consultants
        </h1>
        <p className="font-display text-lg font-semibold text-secondary-foreground md:text-2xl max-w-2xl drop-shadow">
          Your Trusted Health &amp; Safety Consultant
        </p>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full transition-all ${i === current ? "bg-primary scale-125" : "bg-secondary-foreground/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;
