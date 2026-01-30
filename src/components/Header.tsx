import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-dark-grey border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold text-primary hover:text-secondary transition-colors">
          LEVEL4
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-paragraph text-foreground hover:text-primary transition-colors">
            Accueil
          </Link>
          <Link to="/about" className="font-paragraph text-foreground hover:text-primary transition-colors">
            À Propos
          </Link>
          <Link to="/services" className="font-paragraph text-foreground hover:text-primary transition-colors">
            Services
          </Link>
          <Link to="/realisations" className="font-paragraph text-foreground hover:text-primary transition-colors">
            Réalisations
          </Link>
          <Link to="/contact" className="font-paragraph text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-dark-grey border-t border-primary/20 px-6 py-4 space-y-4">
          <Link
            to="/"
            className="block font-paragraph text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/about"
            className="block font-paragraph text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            À Propos
          </Link>
          <Link
            to="/services"
            className="block font-paragraph text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/realisations"
            className="block font-paragraph text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Réalisations
          </Link>
          <Link
            to="/contact"
            className="block font-paragraph text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
