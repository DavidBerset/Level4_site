import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Services, PacksTarifaires, Ralisations, Matriellalocation, AvisClients } from '@/entities';
import { 
  Volume2, 
  Lightbulb, 
  Music, 
  Package, 
  Settings, 
  Star,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export default function HomePage() {
  const [services, setServices] = useState<Services[]>([]);
  const [packs, setPacks] = useState<PacksTarifaires[]>([]);
  const [realisations, setRealisations] = useState<Ralisations[]>([]);
  const [materiel, setMateriel] = useState<Matriellalocation[]>([]);
  const [avis, setAvis] = useState<AvisClients[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, packsData, realisationsData, materielData, avisData] = await Promise.all([
          BaseCrudService.getAll<Services>('services'),
          BaseCrudService.getAll<PacksTarifaires>('packstarifaires'),
          BaseCrudService.getAll<Ralisations>('ralisations'),
          BaseCrudService.getAll<Matriellalocation>('matriellalocation'),
          BaseCrudService.getAll<AvisClients>('avisclients')
        ]);

        setServices(servicesData.items);
        setPacks(packsData.items);
        // Trier les réalisations par jauge (nombre de personnes) décroissante
        const sortedRealisations = realisationsData.items.sort((a, b) => {
          const jaugeA = a.audienceSize || 0;
          const jaugeB = b.audienceSize || 0;
          return jaugeB - jaugeA;
        });
        setRealisations(sortedRealisations);
        setMateriel(materielData.items);
        setAvis(avisData.items);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const serviceIcons = {
    'Sonorisation': Volume2,
    'Éclairage': Lightbulb,
    'DJ': Music,
    'Location': Package,
    'Ingénierie': Settings
  };

  const heroWords = "Votre partenaire technique pour vos projets événementiels".split(" ");

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-dark-grey">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-heading font-bold text-primary">{"LEVEL4 Sound & Light"}</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('accueil')} className="text-foreground hover:text-primary transition-colors">
                Accueil
              </button>
              <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('packs')} className="text-foreground hover:text-primary transition-colors">
                Packs
              </button>
              <button onClick={() => scrollToSection('realisations')} className="text-foreground hover:text-primary transition-colors">
                Réalisations
              </button>
              <button onClick={() => scrollToSection('materiel')} className="text-foreground hover:text-primary transition-colors">
                Matériel
              </button>
              <button onClick={() => scrollToSection('apropos')} className="text-foreground hover:text-primary transition-colors">
                À propos
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
                Contact
              </button>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-2 rounded-lg shadow-lg shadow-primary/20"
              >
                Demander un devis
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-4 border-t border-dark-grey"
            >
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('accueil')} className="text-left text-foreground hover:text-primary transition-colors">
                  Accueil
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left text-foreground hover:text-primary transition-colors">
                  Services
                </button>
                <button onClick={() => scrollToSection('packs')} className="text-left text-foreground hover:text-primary transition-colors">
                  Packs
                </button>
                <button onClick={() => scrollToSection('realisations')} className="text-left text-foreground hover:text-primary transition-colors">
                  Réalisations
                </button>
                <button onClick={() => scrollToSection('materiel')} className="text-left text-foreground hover:text-primary transition-colors">
                  Matériel
                </button>
                <button onClick={() => scrollToSection('apropos')} className="text-left text-foreground hover:text-primary transition-colors">
                  À propos
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-foreground hover:text-primary transition-colors">
                  Contact
                </button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full"
                >
                  Demander un devis
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </header>
      {/* Hero Section */}
      <section id="accueil" className="h-screen grid place-items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-dark-grey to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_70%)]"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
            {heroWords.map((word, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="inline-block mr-4"
              >
                <h1 className="text-4xl md:text-7xl font-heading font-bold text-white inline">
                  {word}
                </h1>
              </motion.div>
            ))}
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 font-paragraph"
          >
            Sonorisation • Éclairage • Régie • Location • Ingénierie
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-4 text-lg rounded-lg shadow-lg shadow-primary/20"
            >
              Demander un devis
            </Button>
            <Button 
              onClick={() => scrollToSection('packs')}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4 text-lg rounded-lg"
            >
              Découvrir nos packs
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary animate-bounce" />
        </motion.div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-24 bg-dark-grey/50">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Des solutions techniques complètes pour tous vos événements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.serviceName as keyof typeof serviceIcons] || Settings;
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-background/50 border-dark-grey hover:border-primary/50 transition-all duration-300 h-full group">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-heading text-white">
                        {service.serviceName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-gray-400 mb-6">
                        {service.description}
                      </CardDescription>
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
                      >
                        Voir plus
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Packs Section */}
      <section id="packs" className="py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Nos Packs Tarifaires
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Des formules adaptées à chaque type d'événement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packs.map((pack, index) => (
              <motion.div
                key={pack._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/50 border-dark-grey hover:border-primary/50 transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading text-white text-center">
                      {pack.packName}
                    </CardTitle>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-primary">
                        dès CHF {pack.startingPrice}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-gray-400">
                        Public max: <span className="text-white font-semibold">{pack.maxAudience} personnes</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Contenu inclus:</p>
                      <p className="text-white text-sm">{pack.includedContent}</p>
                    </div>
                    <div className="pt-4">
                      <Button 
                        onClick={() => scrollToSection('contact')}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Réalisations Section */}
      <section id="realisations" className="py-24 bg-dark-grey/50">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Nos Réalisations
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Découvrez quelques-uns de nos événements marquants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {realisations.map((realisation, index) => (
              <motion.div
                key={realisation._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/50 border-dark-grey hover:border-primary/50 transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    {realisation.eventPhoto ? (
                      <Image
                        src={realisation.eventPhoto}
                        alt={realisation.eventName || 'Événement'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-dark-grey flex items-center justify-center">
                        <Music className="w-16 h-16 text-primary/50" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-white mb-2">
                      {realisation.eventName}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p><MapPin className="inline w-4 h-4 mr-1" />{realisation.location}</p>
                      <p>Jauge: {realisation.audienceSize} personnes</p>
                      <p>Système: {realisation.systemUsed}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Matériel Section */}
      <section id="materiel" className="py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Matériel à la Location
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Équipements professionnels de haute qualité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {materiel.filter(equipment => equipment.category?.toLowerCase() !== 'éclairage' && equipment.category?.toLowerCase() !== 'lighting').map((equipment, index) => (
              <motion.div
                key={equipment._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/50 border-dark-grey hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    {equipment.equipmentImage ? (
                      <Image
                        src={equipment.equipmentImage}
                        alt={equipment.name || 'Équipement'}
                        className="w-full h-full object-cover"
                        width={300}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-dark-grey flex items-center justify-center">
                        <Package className="w-16 h-16 text-primary/50" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-white mb-2">
                      {equipment.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{equipment.brand}</p>
                    <p className="text-sm text-gray-300 mb-4">{equipment.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-semibold">
                        CHF {equipment.pricePerDay}/jour
                      </span>
                      <span className="text-xs text-gray-400 bg-dark-grey px-2 py-1 rounded">
                        {equipment.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-background/50 border border-dark-grey rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">Beaucoup d'autres produits disponibles</h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">Nous disposons d'une large gamme de matériel professionnel supplémentaire. Contactez-nous pour connaître l'ensemble de nos équipements et trouver la solution parfaite pour votre événement.</p>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3 rounded-lg"
              >
                Demander le catalogue complet
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-background/50 border border-dark-grey rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">Éclairage & Structures</h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">Pour les solutions d'éclairage et de structures, nous collaborons avec <span className="text-primary font-semibold">Lumison</span>, notre partenaire spécialisé, afin de vous proposer les meilleures technologies et services adaptés à vos besoins.</p>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-3 rounded-lg"
              >
                Nous contacter pour l'éclairage et les structures
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* À propos Section */}
      <section id="apropos" className="py-24 bg-dark-grey/50">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                À propos de LEVEL4
              </h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  Basée en Romandie, LEVEL4 accompagne vos événements du montage à la diffusion. 
                  Nous travaillons avec du matériel professionnel RCF, Turbosound et PreSonus.
                </p>
                <p>
                  Notre équipe d'experts techniques intervient pour des mariages, festivals, 
                  concerts, soirées d'entreprise et fêtes locales dans toute la région.
                </p>
                <p>
                  Nous nous engageons à fournir des solutions audiovisuelles de haute qualité, 
                  adaptées à chaque événement et à chaque budget.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="https://static.wixstatic.com/media/46d81a_310cf5c07b8246889b26dc8755cc4507~mv2.png?originWidth=576&originHeight=448"
                  alt="Équipe LEVEL4 en action"
                  className="w-full h-full object-cover"
                  width={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Avis Section */}
      <section className="py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Témoignages Clients
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ce que nos clients disent de nos services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avis.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/50 border-dark-grey h-full">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-primary fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-300 mb-6 italic">
                      "{testimonial.reviewText}"
                    </blockquote>
                    <div className="flex items-center">
                      <div>
                        <p className="font-semibold text-white">{testimonial.firstName}</p>
                        <p className="text-sm text-gray-400">{testimonial.eventType}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-dark-grey/50">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Devis Express
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Contactez-nous pour obtenir un devis personnalisé
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-background/50 border-dark-grey">
                <CardContent className="p-8">
                  {formSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-heading font-semibold text-white mb-2">
                        Merci !
                      </h3>
                      <p className="text-gray-400">
                        Nous vous répondons dans la journée.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Type d'événement
                          </label>
                          <Select>
                            <SelectTrigger className="bg-background border-dark-grey text-white">
                              <SelectValue placeholder="Sélectionnez..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mariage">Mariage</SelectItem>
                              <SelectItem value="concert">Concert</SelectItem>
                              <SelectItem value="festival">Festival</SelectItem>
                              <SelectItem value="entreprise">Soirée d'entreprise</SelectItem>
                              <SelectItem value="fete">Fête locale</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Date
                          </label>
                          <Input 
                            type="date" 
                            className="bg-background border-dark-grey text-white"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Lieu
                          </label>
                          <Input 
                            placeholder="Ville, canton"
                            className="bg-background border-dark-grey text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Jauge (nombre de personnes)
                          </label>
                          <Input 
                            type="number"
                            placeholder="ex: 150"
                            className="bg-background border-dark-grey text-white"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Budget approximatif (CHF)
                          </label>
                          <Select>
                            <SelectTrigger className="bg-background border-dark-grey text-white">
                              <SelectValue placeholder="Sélectionnez..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="500-1000">500 - 1'000</SelectItem>
                              <SelectItem value="1000-2500">1'000 - 2'500</SelectItem>
                              <SelectItem value="2500-5000">2'500 - 5'000</SelectItem>
                              <SelectItem value="5000+">5'000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Téléphone
                          </label>
                          <Input 
                            type="tel"
                            placeholder="+41 XX XXX XX XX"
                            className="bg-background border-dark-grey text-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <Input 
                          type="email"
                          placeholder="votre@email.com"
                          className="bg-background border-dark-grey text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message (optionnel)
                        </label>
                        <Textarea 
                          placeholder="Décrivez vos besoins spécifiques..."
                          className="bg-background border-dark-grey text-white min-h-[100px]"
                        />
                      </div>

                      <Button 
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full py-3 text-lg font-semibold"
                      >
                        Envoyer la demande
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-heading font-semibold text-white mb-6">
                  Informations de Contact
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Téléphone</p>
                      <p className="text-gray-400">+41 XX XXX XX XX</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <p className="text-gray-400">contact@level4.ch</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Zone d'intervention</p>
                      <p className="text-gray-400">Toute la Romandie</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background/50 border border-dark-grey rounded-lg p-6">
                <h4 className="text-lg font-heading font-semibold text-white mb-4">
                  Horaires de réponse
                </h4>
                <div className="space-y-2 text-gray-400">
                  <p>Lundi - Vendredi: 8h - 18h</p>
                  <p>Samedi: 9h - 17h</p>
                  <p>Dimanche: Sur demande</p>
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded border border-primary/20">
                  <p className="text-primary text-sm font-medium">
                    Réponse garantie dans la journée
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-background border-t border-dark-grey py-12">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">LEVEL4</h3>
            <p className="text-gray-400 mb-4">
              Votre partenaire technique pour vos projets événementiels
            </p>
            <p className="text-sm text-gray-500">
              © 2024 LEVEL4. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}