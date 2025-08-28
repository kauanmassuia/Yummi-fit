import { Target, TrendingUp, Users2, Zap } from "lucide-react";
import executiveLifestyle from "@/media/YogaWoman.svg";

export const About = () => {
  const values = [
    {
      icon: Target,
      title: "Yummi",
      subtitle: "O prazer de comer bem",
      description: "Porque alimentação saudável não pode ser sinônimo de comida sem graça. Cada receita é pensada para despertar o prazer gastronômico."
    },
    {
      icon: TrendingUp,
      title: "Fit", 
      subtitle: "Saúde & Performance",
      description: "Compromisso real com seus resultados. Receitas desenvolvidas para alta performance, energia e conquista de objetivos."
    },
    {
      icon: Zap,
      title: "Tecnologia",
      subtitle: "Inovação que funciona",
      description: "IA avançada que entende suas necessidades e transforma qualquer ingrediente em uma experiência culinária única."
    },
    {
      icon: Users2,
      title: "Exclusividade",
      subtitle: "Para quem busca excelência",
      description: "Desenvolvido para executivos que não aceitam meio termo. Qualidade premium em cada interação."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent-warm/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-warm/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-premium">
            <div className="w-2 h-2 bg-primary-foreground rounded-full animate-glow"></div>
            Nossa História & Valores
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Por que o 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> YummiFit </span>
            existe?
          </h2>
        </div>

        {/* Executive Story Section - Premium Layout */}
        <div className="relative mb-32">
          {/* Background Gradient Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-warm/10 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-background/80 via-transparent to-background/80 rounded-3xl"></div>
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Content - Executive Story */}
            <div className="lg:col-span-7 space-y-8">
              {/* Premium Header */}
              <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-md border border-primary/20 rounded-3xl p-8 shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-warm/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                      <span className="text-2xl text-primary-foreground">👑</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Exclusivo para Executivos</h3>
                      <p className="text-muted-foreground text-sm">O problema que só nós entendemos</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-2xl lg:text-3xl font-bold text-foreground leading-tight italic">
                    "Por que comer saudável ainda parece algo sem graça ou difícil de manter no dia a dia?"
                  </blockquote>
                </div>
              </div>

              {/* Story Timeline */}
              <div className="space-y-6">
                {/* Problem */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-red-500/20 border-2 border-red-500/40 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="w-px h-16 bg-gradient-to-b from-red-500/40 to-primary/40"></div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-3">O Problema Real</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Percebemos que <span className="text-foreground font-semibold">muita gente entra numa dieta motivada</span>, mas logo desiste porque acha complicado inventar receitas ou porque a comida fitness parece sem sabor.
                    </p>
                  </div>
                </div>

                {/* Insight */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-accent-warm/20 border-2 border-accent-warm/40 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-accent-warm rounded-full animate-glow"></div>
                    </div>
                    <div className="w-px h-16 bg-gradient-to-b from-accent-warm/40 to-primary/40"></div>
                  </div>
                  <div className="bg-gradient-to-br from-accent-warm/5 to-accent-warm/10 border border-accent-warm/20 rounded-2xl p-6 flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-3">O Insight Revolucionário</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Foi aí que pensamos: <span className="text-primary font-semibold">e se a tecnologia pudesse transformar qualquer ingrediente esquecido na geladeira em algo gostoso e saudável, em segundos?</span>
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-primary/20 border-2 border-primary/40 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full animate-glow"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-3">A Solução Premium</h4>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Nossa missão é quebrar o mito de que alimentação saudável é restritiva ou chata, mostrando que é possível ser prático, gostoso e dentro da dieta.
                    </p>
                    <div className="bg-background/50 rounded-xl p-4">
                      <p className="text-foreground font-semibold">
                        <span className="text-primary">Com uma simples foto no WhatsApp</span>, você descobre receitas fitness criativas para seus próprios ingredientes. <span className="text-accent-warm">Sem desperdício, sem desculpas, sem complicação.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Visual & Stats */}
            <div className="lg:col-span-5 space-y-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {/* Executive Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>
                <img 
                  src={executiveLifestyle} 
                  alt="Executive lifestyle with healthy eating" 
                  className="relative z-10 w-full rounded-3xl shadow-premium group-hover:shadow-glow transition-shadow duration-300"
                />
                
                {/* Premium Badge */}
                <div className="absolute top-6 right-6 bg-gradient-primary backdrop-blur-md rounded-2xl px-4 py-2 shadow-premium">
                  <span className="text-primary-foreground font-bold text-sm">PREMIUM</span>
                </div>
              </div>

              {/* Executive Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 text-center shadow-premium">
                  <div className="text-3xl font-bold text-primary mb-2">3h</div>
                  <div className="text-sm text-muted-foreground">Economia por semana</div>
                </div>
                <div className="bg-background/95 backdrop-blur-sm border border-accent-warm/20 rounded-2xl p-6 text-center shadow-premium">
                  <div className="text-3xl font-bold text-accent-warm mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfação garantida</div>
                </div>
              </div>

              {/* Executive Testimonials */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-premium">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-lg">M</span>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">"Nunca mais fiquei sem ideias para o almoço"</p>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-semibold">Marina Silva</span> • CEO, Fintech
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-premium">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-warm to-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-bold text-lg">R</span>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">"Finalmente consegui manter a dieta sem stress"</p>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-semibold">Roberto Costa</span> • Diretor Comercial
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="relative z-10 mt-16">
            <div className="bg-gradient-to-r from-primary/15 via-primary/10 to-accent-warm/15 rounded-3xl p-8 lg:p-12 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background/50 to-transparent rounded-3xl"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent-warm/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-3 bg-gradient-primary rounded-full px-6 py-3 mb-6 shadow-glow">
                  <div className="w-3 h-3 bg-primary-foreground rounded-full animate-glow"></div>
                  <span className="text-primary-foreground font-bold text-sm">TECNOLOGIA EXCLUSIVA</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  É tecnologia ajudando você a manter <br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">constância</span>, sem abrir mão do <span className="bg-gradient-primary bg-clip-text text-transparent">prazer de comer</span>
                </h3>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Desenvolvido especificamente para executivos que valorizam tempo, qualidade e resultados. 
                  Sem comprometer o padrão de excelência que você espera.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div 
                key={index}
                className="text-center p-8 rounded-3xl bg-background/50 backdrop-blur-sm border border-border/50 hover:shadow-premium transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow animate-glow">
                  <IconComponent className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                  {value.title}
                </h3>
                
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  {value.subtitle}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};