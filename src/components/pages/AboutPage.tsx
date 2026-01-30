import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="w-full">
        {/* Hero Section */}
        <section className="w-full py-20 bg-gradient-to-b from-dark-grey to-background">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-heading text-6xl md:text-7xl font-bold text-primary mb-6">
                À Propos de Nous
              </h1>
              <p className="font-paragraph text-lg text-light-cyan max-w-2xl mx-auto">
                L'histoire de LEVEL4 : De la passion pour la musique à l'excellence technique
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="w-full py-20 bg-background">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-16"
            >
              {/* Before 2025 */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-12 bg-primary rounded-full"></div>
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
                    Avant 2025
                  </h2>
                </div>
                <h3 className="font-heading text-2xl font-semibold text-secondary mb-4">
                  Les Fondations
                </h3>
                <div className="space-y-4 text-foreground">
                  <p className="font-paragraph text-lg leading-relaxed">
                    Nous sommes actif depuis 1983.
                  </p>
                  <p className="font-paragraph text-lg leading-relaxed">
                    D'abord nous étions une bande de copains passionnés proposant des soirées DJ.
                  </p>
                  <p className="font-paragraph text-lg leading-relaxed">
                    En 1987 nous sonorisions / éclairions notre première manifestions sous cantine, (fête de chant)
                  </p>
                  <p className="font-paragraph text-lg leading-relaxed">
                    Depuis nous n'avons cessé d'évoluer dans le monde de l'événementiel et pouvons aujourd'hui vous proposer des solutions conformes à vos attentes ainsi qu'a votre budget.
                  </p>
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div variants={itemVariants} className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"></motion.div>

              {/* After 2025 */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-12 bg-secondary rounded-full"></div>
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary">
                    Après 2025
                  </h2>
                </div>
                <h3 className="font-heading text-2xl font-semibold text-light-cyan mb-4">
                  La Nouvelle Ère de LEVEL4
                </h3>
                <div className="space-y-4 text-foreground">
                  <p className="font-paragraph text-lg leading-relaxed">
                    Ayant travaillé aux côtés de mon père depuis mon plus jeune âge, j'ai toujours été passionné par la sonorisation et l'univers de la musique.
                  </p>
                  <p className="font-paragraph text-lg leading-relaxed">
                    En janvier 2025, j'ai pris la décision de reprendre seul les rênes de LEVEL4. Cette transition a été un moteur pour approfondir mes connaissances et me perfectionner dans l'art d'optimiser la sonorisation d'événements.
                  </p>
                  <p className="font-paragraph text-lg leading-relaxed">
                    Ces recherches et cette immersion ont fait naître une véritable passion pour l'excellence technique et la manière de rendre chaque événement inoubliable grâce à une qualité de son et de lumière irréprochable.
                  </p>
                  <p className="font-paragraph text-lg leading-relaxed">
                    Je m'engage dans un processus d'amélioration continue, tant pour mes compétences personnelles que pour l'évolution constante de mon parc matériel, afin de garantir des prestations à la pointe de la technologie.
                  </p>
                  <p className="font-paragraph text-lg leading-relaxed">
                    Dans cette aventure, je suis fièrement épaulé par mon frère et plusieurs amis fidèles qui, par leur engagement, contribuent au succès et à la réalisation de nos projets.
                  </p>
                  <p className="font-paragraph text-lg leading-relaxed font-semibold text-primary">
                    N'hésitez pas à nous contacter dès aujourd'hui pour concrétiser votre événement !
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
