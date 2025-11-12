import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { Header } from '@/components/Header';
import { copy } from '@/data/copy';
import StarBorder from '@/components/ui/StarBorder';
import TiltedCard from '@/components/ui/TiltedCard';
import TextType from '@/components/ui/TextType';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[var(--bg)]">
      {/* Header */}
      <Header />

      <Container size="xl" className="flex-1 flex items-center relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Subtitle with icon */}
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="text-brand">🎾</span>
              <span>{copy.hero.trustBar}</span>
            </div>

            {/* Main Headline */}
            <div className="relative mb-6">
              <div className="h-[200px] lg:h-[240px] xl:h-[280px] w-full">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight absolute top-0 left-0 w-full">
                  <TextType
                    text={[
                      "Jogue como vive. Viva como um atleta.",
                      "Um movimento que conecta tecnologia, corpo e mente.",
                      "O YummiFit leva a performance dos tenistas a outro nível."
                    ]}
                    typingSpeed={75}
                    pauseDuration={4000}
                    deletingSpeed={50}
                    cursorCharacter="_"
                    cursorBlinkDuration={0.5}
                    showCursor={true}
                    loop={true}
                    className="block"
                  />
                </h1>
              </div>
            </div>

            {/* Lead */}
            <p className="text-xl lg:text-2xl text-foreground leading-relaxed max-w-xl mb-6">
              {copy.hero.lead}
            </p>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {copy.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                className="relative inline-block overflow-hidden rounded-[20px] h-14 px-8 text-base font-semibold bg-brand text-ink hover:bg-brand-600 border border-brand/20 shadow-lg transition-all duration-200"
              >
                <div className="relative z-[1] text-center">
                  {copy.hero.ctaPrimary}
                </div>
              </button>
              <StarBorder
                as="button"
                color="var(--brand)"
                speed="5s"
                thickness={3}
                className="h-14 px-8 text-base font-semibold"
              >
                {copy.hero.ctaSecondary}
              </StarBorder>
            </div>
          </motion.div>

          {/* Right Column - TiltedCard */}
          <div className="hidden lg:flex items-center justify-center">
            <TiltedCard
              containerHeight="700px"
              containerWidth="100%"
              imageHeight="500px"
              imageWidth="500px"
              rotateAmplitude={12}
              scaleOnHover={1.1}
              showTooltip={false}
              displayOverlayContent={true}
              showMobileWarning={false}
              overlayContent={
                <div className="absolute top-4 left-4 rounded-2xl px-4 py-2 bg-gray-500/20 backdrop-blur-md border border-white/30 shadow-lg">
                  <h3 className="text-lg font-bold text-white">Título da Imagem</h3>
                </div>
              }
            />
          </div>
        </div>
      </Container>

      {/* Explore More */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-sm">Explorar Mais</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
