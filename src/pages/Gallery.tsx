import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import WhatsAppFAB from "@/components/WhatsAppFAB";

import hero1 from "@/assets/hero-1-hd.jpg";
import hero2 from "@/assets/hero-2-hd.jpg";
import hero3 from "@/assets/hero-3-replacement-hd.jpg";
import hero4 from "@/assets/hero-4-hd.jpg";
import hero5 from "@/assets/hero-5-hd.jpg";
import hero6 from "@/assets/hero-6-hd.jpg";
import hero7 from "@/assets/hero-7-hd.jpg";
import hero8 from "@/assets/hero-8-hd.jpg";
import heroNewA from "@/assets/hero-new-a-hd.jpg";
import heroNewB from "@/assets/hero-new-b-hd.jpg";
import heroNewC from "@/assets/hero-new-c-hd.jpg";

const photos = [
  { src: hero1, alt: "FC Safety team reviewing site plans" },
  { src: hero2, alt: "FC Safety Consultants team on construction site" },
  { src: hero3, alt: "Safety inspection on construction site" },
  { src: hero4, alt: "Construction site scaffolding inspection" },
  { src: hero5, alt: "Safety officer reviewing documentation" },
  { src: hero6, alt: "Construction site safety overview" },
  { src: hero7, alt: "Safety equipment review" },
  { src: hero8, alt: "On-site safety briefing" },
  { src: heroNewA, alt: "Safety officer inspecting high-rise construction site in Cape Town" },
  { src: heroNewB, alt: "Safety officer inspecting ductwork installation on site" },
  { src: heroNewC, alt: "Safety representative inspecting building exterior on city street" },
];

const Gallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-[110px] pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-display font-semibold"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>

          <header className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-primary mb-3">
              Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse of FC Safety Consultants on site — keeping South African workplaces safe and compliant.
            </p>
          </header>

          <div className="relative">
            {/* Carousel viewport */}
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {photos.map((p, i) => {
                  const isActive = i === selectedIndex;
                  return (
                    <div
                      key={i}
                      className="relative shrink-0 grow-0 px-2"
                      // basis ~80% so neighbour slides peek through on the sides
                      style={{ flexBasis: "80%" }}
                    >
                      <div
                        className="relative aspect-[16/9] overflow-hidden rounded-lg bg-black transition-all duration-500"
                        style={{
                          filter: isActive ? "blur(0px)" : "blur(6px)",
                          opacity: isActive ? 1 : 0.55,
                          transform: isActive ? "scale(1)" : "scale(0.95)",
                        }}
                      >
                        <img
                          src={p.src}
                          alt={p.alt}
                          loading={i === 0 ? "eager" : "lazy"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prev / Next buttons */}
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 hover:bg-black/80 text-white p-3 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 hover:bg-black/80 text-white p-3 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className="h-2.5 w-2.5 rounded-full border border-foreground/30 transition-all duration-300"
                style={{
                  backgroundColor: i === selectedIndex ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  transform: i === selectedIndex ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Caption */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {selectedIndex + 1} / {photos.length} — {photos[selectedIndex]?.alt}
          </p>
        </div>
      </main>
      <ContactFooter />
      <WhatsAppFAB />
    </>
  );
};

export default Gallery;
