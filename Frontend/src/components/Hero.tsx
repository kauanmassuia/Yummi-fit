import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroPhone from "@/assets/hero-phone.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Floating 3D Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float blur-sm"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-warm/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-primary-glow/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left animate-slide-up">
            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Amado por <span className="font-semibold text-foreground">5.000+</span> executivos
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Transforme 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> qualquer</span>
              <br />
              ingrediente em uma
              <span className="bg-gradient-primary bg-clip-text text-transparent"> receita fitness</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Para executivos que querem <strong>resultados reais</strong> sem abrir mão do prazer de comer bem. 
              Uma simples foto no WhatsApp e você tem receitas fitness personalizadas em segundos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="lg" className="text-xl px-8 py-6">
                Começar Agora - R$ 24,99/mês
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Ver Como Funciona
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
                <span>Receitas em menos de 30s</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-glow" style={{ animationDelay: '1s' }}></div>
                <span>100% Personalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-glow" style={{ animationDelay: '2s' }}></div>
                <span>Direto no WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img 
                src={heroPhone} 
                alt="YummiFit App Interface" 
                className="w-full max-w-lg mx-auto shadow-premium rounded-3xl animate-float"
              />
              
              {/* Floating Recipe Cards */}
              <div className="absolute -top-8 -left-8 bg-background/90 backdrop-blur-sm p-4 rounded-2xl shadow-premium animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-sm font-semibold text-primary">🥑 Abacate + Quinoa</div>
                <div className="text-xs text-muted-foreground">Bowl Power em 15 min</div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-background/90 backdrop-blur-sm p-4 rounded-2xl shadow-premium animate-float" style={{ animationDelay: '2s' }}>
                <div className="text-sm font-semibold text-primary">🍗 Frango + Brócolis</div>
                <div className="text-xs text-muted-foreground">High Protein Ready!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};