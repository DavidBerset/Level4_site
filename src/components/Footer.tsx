import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark-grey border-t border-primary/20">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-primary">LEVEL4</h3>
            <p className="font-paragraph text-foreground/80">
              Votre partenaire en sonorisation et éclairage pour des événements inoubliables depuis 1983.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-secondary">Navigation</h4>
            <nav className="space-y-2">
              <Link to="/" className="block font-paragraph text-foreground/80 hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link to="/about" className="block font-paragraph text-foreground/80 hover:text-primary transition-colors">
                À Propos
              </Link>
              <Link to="/services" className="block font-paragraph text-foreground/80 hover:text-primary transition-colors">
                Services
              </Link>
              <Link to="/realisations" className="block font-paragraph text-foreground/80 hover:text-primary transition-colors">
                Réalisations
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold text-secondary">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:contact@level4.fr" className="flex items-center gap-3 font-paragraph text-foreground/80 hover:text-primary transition-colors">
                <Mail size={18} />
                contact@level4.fr
              </a>
              <a href="tel:+33123456789" className="flex items-center gap-3 font-paragraph text-foreground/80 hover:text-primary transition-colors">
                <Phone size={18} />
                +33 1 23 45 67 89
              </a>
              <div className="flex items-start gap-3 font-paragraph text-foreground/80">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Votre adresse ici</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary/20 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="font-paragraph text-foreground/60 text-sm">
            © {currentYear} LEVEL4. Tous droits réservés.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="font-paragraph text-foreground/60 hover:text-primary transition-colors text-sm">
              Mentions légales
            </a>
            <a href="#" className="font-paragraph text-foreground/60 hover:text-primary transition-colors text-sm">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
