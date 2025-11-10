import { Camera, Clock, Smartphone, TrendingUp, Users, Shield, Sparkles } from "lucide-react";
import floatingIngredients from "@/media/ManCooking.svg";
// Aurora background removed from this section per request

export const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Foto = Receita Instantânea",
      description: "Envie uma foto dos seus ingredientes no WhatsApp e receba receitas fitness personalizadas em menos de 30 segundos.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Clock,
      title: "Economia de Tempo", 
      description: "Sem pesquisas, sem planejamento. Resultados imediatos para sua rotina: treino, trabalho, família e viagens.",
      color: "bg-accent-warm/10 text-accent-warm"
    },
    {
      icon: TrendingUp,
      title: "Performance & Resultados",
      description: "Receitas desenvolvidas para alta performance, focadas em seus objetivos específicos: ganho de massa, definição ou energia.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Smartphone,
      title: "Integração WhatsApp",
      description: "Tecnologia que se adapta ao seu ritmo. Funciona onde você já está, sem precisar baixar outro app.",
      color: "bg-primary-glow/10 text-primary"
    },
    {
      icon: Sparkles,
      title: "Zero Desperdício",
      description: "Aproveite 100% dos ingredientes que você já tem, reduzindo desperdício e economizando dinheiro.",
      color: "bg-accent-warm/10 text-accent-warm"
    },
    {
      icon: Shield,
      title: "Confiança & Qualidade",
      description: "Receitas pensadas com boas práticas nutricionais e foco em objetivos reais de gente de verdade.",
      color: "bg-primary/10 text-primary"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-warm/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
            Por que pessoas escolhem a YummiFit?
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Tecnologia que
            <span className="bg-gradient-primary bg-clip-text text-transparent"> entende</span>
            <br />
            sua rotina
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Desenvolvido especificamente para profissionais que precisam de <strong>eficiência</strong>, 
            <strong> praticidade</strong> e <strong>resultados consistentes</strong> na alimentação.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-3xl bg-background/50 backdrop-blur-sm border border-border/50 hover:shadow-premium transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-glow transition-all duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Visual Element */}
        <div className="relative">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ingredientes Premium, Receitas de Elite
            </h3>
            <p className="text-muted-foreground">
              Nossa IA reconhece mais de 2000+ ingredientes e cria combinações exclusivas
            </p>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <img 
              src={floatingIngredients} 
              alt="Premium healthy ingredients" 
              className="w-full rounded-3xl shadow-premium animate-float"
            />
            
            {/* Floating Stats */}
            <div className="absolute -top-6 -left-6 bg-background/90 backdrop-blur-sm p-6 rounded-2xl shadow-premium animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-2xl font-bold text-primary">2000+</div>
              <div className="text-sm text-muted-foreground">Ingredientes</div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-background/90 backdrop-blur-sm p-6 rounded-2xl shadow-premium animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-2xl font-bold text-primary">&lt; 30s</div>
              <div className="text-sm text-muted-foreground">Resposta</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};