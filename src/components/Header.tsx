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
          <Link to="/sonorisation" className="font-paragraph text-foreground hover:text-primary transition-colors">
            Sonorisation
          </Link>
          <Link to="/studio" className="font-paragraph text-foreground hover:text-primary transition-colors">
            Studio
          </Link>
          <Link to="/about" className="font-paragraph text-foreground hover:text-primary transition-colors">
            À Propos
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
            to="/sonorisation"
            className="block font-paragraph text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Sonorisation
          </Link>
          <Link
            to="/studio"
            className="block font-paragraph text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Studio
          </Link>
          <Link
            to="/about"
            className="block font-paragraph text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            À Propos
          </Link>
        </nav>
      )}
    </header>
  );
}
