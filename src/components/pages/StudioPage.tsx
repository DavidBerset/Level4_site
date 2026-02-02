import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Matriellalocation } from '@/entities';
import { 
  Mic2,
  Package,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ArrowLeft,
  Headphones,
  Radio,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudioPage() {
  const navigate = useNavigate();
  const [studioEquipment, setStudioEquipment] = useState<Matriellalocation[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    duration: '',
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const materielData = await BaseCrudService.getAll<Matriellalocation>('matriellalocation');
        // Filter for studio equipment (éclairage/lighting category)
        const studioItems = materielData.items.filter(equipment => 
          equipment.category?.toLowerCase() === 'éclairage' || 
          equipment.category?.toLowerCase() === 'lighting'
        );
        const sortedStudio = studioItems.sort((a, b) => {
          const ordreA = a.ordre || 0;
          const ordreB = b.ordre || 0;
          return ordreA - ordreB;
        });
        setStudioEquipment(sortedStudio);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        serviceType: '',
        date: '',
        duration: '',
        phone: '',
        email: '',
        message: ''
      });
    }, 5000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const studioServices = [
    {
      icon: Mic2,
      title: 'Enregistrement',
      description: 'Enregistrement professionnel de haute qualité avec équipement de pointe'
    },
    {
      icon: Headphones,
      title: 'Mixage',
      description: 'Mixage expert pour vos productions musicales et podcasts'
    },
    {
      icon: Radio,
      title: 'Mastering',
      description: 'Mastering professionnel pour une qualité de diffusion optimale'
    },
    {
      icon: Zap,
      title: 'Production',
      description: 'Services de production musicale complets et personnalisés'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-dark-grey">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-heading font-bold text-secondary">{"LEVEL4 Studio"}</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-foreground hover:text-secondary transition-colors flex items-center gap-2">
                <ArrowLeft size={18} />
                Retour
              </button>
              <button onClick={() => scrollToSection('accueil')} className="text-foreground hover:text-secondary transition-colors">
                Accueil
              </button>
              <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-secondary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('equipement')} className="text-foreground hover:text-secondary transition-colors">
                Équipement
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-secondary transition-colors">
                Contact
              </button>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-6 py-2 rounded-lg shadow-lg shadow-secondary/20"
              >
                Réserver
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:text-secondary"
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
                <button onClick={() => navigate('/')} className="text-left text-foreground hover:text-secondary transition-colors flex items-center gap-2">
                  <ArrowLeft size={18} />
                  Retour
                </button>
                <button onClick={() => scrollToSection('accueil')} className="text-left text-foreground hover:text-secondary transition-colors">
                  Accueil
                </button>
                <button onClick={() => scrollToSection('services')} className="text-left text-foreground hover:text-secondary transition-colors">
                  Services
                </button>
                <button onClick={() => scrollToSection('equipement')} className="text-left text-foreground hover:text-secondary transition-colors">
                  Équipement
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-foreground hover:text-secondary transition-colors">
                  Contact
                </button>
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold w-full"
                >
                  Réserver
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="accueil" className="h-screen grid place-items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-dark-grey to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,213,79,0.1),transparent_70%))"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4">
              LEVEL4 Studio
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Enregistrement • Mixage • Mastering • Production
            </p>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 mb-12 font-paragraph max-w-3xl mx-auto"
          >
            Bienvenue dans notre studio professionnel équipé des meilleures technologies pour concrétiser vos projets musicaux
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 py-4 text-lg rounded-lg shadow-lg shadow-secondary/20"
            >
              Réserver une session
            </Button>
            <Button 
              onClick={() => scrollToSection('services')}
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-4 text-lg rounded-lg"
            >
              Découvrir nos services
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-secondary animate-bounce" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-dark-grey/50">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Nos Services Studio
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Des services professionnels pour tous vos besoins en production musicale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {studioServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-background/50 border-dark-grey hover:border-secondary/50 transition-all duration-300 h-full group">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-secondary" />
                      </div>
                      <CardTitle className="text-xl font-heading text-white">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-gray-400">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section id="equipement" className="py-24">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Notre Équipement
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Équipements professionnels de dernière génération
            </p>
          </div>

          {studioEquipment.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {studioEquipment.map((equipment, index) => (
                <motion.div
                  key={equipment._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-background/50 border-dark-grey hover:border-secondary/50 transition-all duration-300 h-full">
                    <div className="relative h-48 overflow-hidden">
                      {equipment.equipmentImage ? (
                        <Image
                          src={equipment.equipmentImage}
                          alt={equipment.name || 'Équipement'}
                          className="w-full h-full object-cover"
                          width={300}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-dark-grey flex items-center justify-center">
                          <Package className="w-16 h-16 text-secondary/50" />
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
                        <span className="text-secondary font-semibold">
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
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-400">Équipement studio en cours de mise à jour</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 bg-background/50 border border-dark-grey rounded-lg p-8 text-center"
          >
            <h3 className="text-2xl font-heading font-semibold text-white mb-4">Besoin d'équipement supplémentaire ?</h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">Nous pouvons vous proposer des solutions d'équipement personnalisées selon vos besoins spécifiques. Contactez-nous pour discuter de votre projet.</p>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 py-3 rounded-lg"
            >
              Nous contacter
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Studio Section */}
      <section className="py-24 bg-dark-grey/50">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                À propos du Studio LEVEL4
              </h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  Le studio LEVEL4 est une extension naturelle de notre expertise en sonorisation et production événementielle. Avec des années d'expérience dans le domaine de l'audio professionnel, nous avons créé un espace dédié à la production musicale de qualité.
                </p>
                <p>
                  Notre studio est équipé des meilleures technologies pour vous offrir une expérience d'enregistrement, de mixage et de mastering de classe mondiale. Que vous soyez artiste émergent ou producteur expérimenté, nous avons les outils et l'expertise pour concrétiser votre vision musicale.
                </p>
                <p>
                  Nous nous engageons à fournir un environnement professionnel, créatif et accueillant où vos projets musicaux peuvent prendre vie avec la meilleure qualité sonore possible.
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
              <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-secondary/20 to-dark-grey flex items-center justify-center">
                <Mic2 className="w-32 h-32 text-secondary/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-dark-grey/50">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Réserver une Session
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Contactez-nous pour réserver votre session studio
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
                      <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-8 h-8 text-secondary" />
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
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Type de service
                        </label>
                        <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange('serviceType', value)}>
                          <SelectTrigger className="bg-background border-dark-grey text-white">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enregistrement">Enregistrement</SelectItem>
                            <SelectItem value="mixage">Mixage</SelectItem>
                            <SelectItem value="mastering">Mastering</SelectItem>
                            <SelectItem value="production">Production complète</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Date souhaitée
                          </label>
                          <Input 
                            type="date" 
                            name="date"
                            value={formData.date}
                            onChange={handleFormChange}
                            className="bg-background border-dark-grey text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Durée (heures)
                          </label>
                          <Input 
                            type="number"
                            placeholder="ex: 4"
                            name="duration"
                            value={formData.duration}
                            onChange={handleFormChange}
                            className="bg-background border-dark-grey text-white"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Téléphone
                          </label>
                          <Input 
                            type="tel"
                            placeholder="+41 XX XXX XX XX"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            className="bg-background border-dark-grey text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                          </label>
                          <Input 
                            type="email"
                            placeholder="votre@email.com"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            className="bg-background border-dark-grey text-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Message (optionnel)
                        </label>
                        <Textarea 
                          placeholder="Décrivez votre projet..."
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          className="bg-background border-dark-grey text-white min-h-[100px]"
                        />
                      </div>

                      <Button 
                        type="submit"
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full py-3 text-lg font-semibold"
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
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Téléphone</p>
                      <a href="tel:+41775113567" className="text-gray-400 hover:text-secondary transition-colors">+41 77 511 35 67</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <a href="mailto:studio@level4.ch" className="text-gray-400 hover:text-secondary transition-colors">studio@level4.ch</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Localisation</p>
                      <p className="text-gray-400">Romandie, Suisse</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background/50 border border-dark-grey rounded-lg p-6">
                <h4 className="text-lg font-heading font-semibold text-white mb-4">
                  Horaires d'ouverture
                </h4>
                <div className="space-y-2 text-gray-400">
                  <p>Lundi - Vendredi: 10h - 22h</p>
                  <p>Samedi: 10h - 20h</p>
                  <p>Dimanche: Sur demande</p>
                </div>
                <div className="mt-4 p-3 bg-secondary/10 rounded border border-secondary/20">
                  <p className="text-secondary text-sm font-medium">
                    Réponse garantie dans les 24 heures
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
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">LEVEL4 Studio</h3>
            <p className="text-gray-400 mb-4">
              Votre studio professionnel pour vos projets musicaux
            </p>
            <p className="text-sm text-gray-500">© 2026 LEVEL4. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
