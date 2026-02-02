import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Music, Mic2, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-dark-grey">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-heading font-bold text-primary">LEVEL4 Sound & Light</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen grid place-items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-dark-grey to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_70%))"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4">
              Choisissez votre univers
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Explorez nos deux domaines d'expertise
            </p>
          </motion.div>

          {/* Choice Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto"
          >
            {/* Sonorisation Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
              onClick={() => navigate('/sonorisation')}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-dark-grey border border-primary/30 group-hover:border-primary/60 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="mb-6 p-4 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-colors">
                    <Music className="w-16 h-16 text-primary" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-white mb-4">
                    Sonorisation
                  </h2>
                  <p className="text-gray-300 mb-8 text-lg">
                    Découvrez nos solutions de sonorisation professionnelles et nos réalisations
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    Explorer
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Studio Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
              onClick={() => navigate('/studio')}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-dark-grey border border-secondary/30 group-hover:border-secondary/60 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="mb-6 p-4 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors">
                    <Mic2 className="w-16 h-16 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-white mb-4">
                    Studio
                  </h2>
                  <p className="text-gray-300 mb-8 text-lg">
                    Explorez nos équipements de studio et nos services d'enregistrement
                  </p>
                  <div className="flex items-center gap-2 text-secondary font-semibold group-hover:gap-4 transition-all">
                    Découvrir
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <p className="text-lg text-gray-400">
              LEVEL4 Sound & Light vous propose deux univers complémentaires pour tous vos besoins en audio et en production musicale.
            </p>
          </motion.div>
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
            <p className="text-sm text-gray-500">© 2026 LEVEL4. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
