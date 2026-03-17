import { useState, useEffect } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

// To replace with your own images:
// 1. Add your images to src/assets/ (e.g., my-photo-1.jpg)
// 2. Import them above (e.g., import myPhoto1 from "@/assets/my-photo-1.jpg")
// 3. Replace entries in the slides array below

const slides = [
  { src: hero1, alt: "Safety team on construction site" },
  { src: hero2, alt: "Safety officer inspecting warehouse" },
  { src: hero3, alt: "Team reviewing safety documents" },
  { src: hero4, alt: "Safety compliance documentation" },
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
    <section id="home" className="relative h-screen w-full overflow-hidden pt-16">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/60" />
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-4xl font-extrabold text-primary md:text-6xl lg:text-7xl drop-shadow-lg mb-4">
          FC Safety Consultants
        </h1>
        <p className="font-display text-lg font-semibold text-secondary-foreground md:text-2xl max-w-2xl drop-shadow">
          Your Trusted Health &amp; Safety Partners in South Africa
        </p>
      </div>
      {/* Dots */}
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
