import { useState } from "react";
import { Menu, X } from "lucide-react";
import helmetIcon from "@/assets/helmet-icon.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-2">
          <img src={helmetIcon} alt="Safety helmet" className="h-8 w-8 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-extrabold text-primary md:text-xl">
              FC<span className="text-secondary-foreground"> Safety Consultants</span>
            </span>
            <span className="text-[10px] font-semibold text-secondary-foreground/70 tracking-wide uppercase md:text-xs">
              Your Trusted Health &amp; Safety Consultant
            </span>
          </div>
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="text-secondary-foreground p-2 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {open && (
        <div className="bg-secondary border-t border-muted/20 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-secondary-foreground hover:text-primary hover:bg-secondary/80 font-display font-semibold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
