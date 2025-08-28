import { Button } from "@/components/ui/button";
import { Check, Crown, Star, Zap } from "lucide-react";

export const Pricing = () => {
  const plans = [
    {
      name: "Mensal",
      price: "24,99",
      period: "/mês",
      description: "Perfeito para experimentar",
      features: [
        "Receitas ilimitadas via WhatsApp",
        "Resposta em menos de 30 segundos", 
        "2000+ ingredientes reconhecidos",
        "Suporte prioritário",
        "Acesso à comunidade VIP"
      ],
      isPopular: false,
      variant: "outline" as const,
      savings: null
    },
    {
      name: "Trimestral",
      price: "19,99",
      period: "/mês",
      originalPrice: "24,99",
      description: "Mais escolhido por executivos",
      features: [
        "Tudo do plano mensal",
        "20% de desconto",
        "Receitas personalizadas por objetivo",
        "Análise nutricional detalhada",
        "Consultoria mensal gratuita",
        "Acesso antecipado a novas features"
      ],
      isPopular: true,
      variant: "premium" as const,
      savings: "Economize R$ 60 no primeiro ano"
    },
    {
      name: "Anual", 
      price: "16,99",
      period: "/mês",
      originalPrice: "24,99",
      description: "Máximo valor para resultados consistentes",
      features: [
        "Tudo dos planos anteriores",
        "32% de desconto",
        "IA personalizada com seu perfil",
        "Mentoria nutricional trimestral",
        "Relatórios de progresso mensais",
        "Acesso vitalício a atualizações",
        "Garantia de 30 dias"
      ],
      isPopular: false,
      variant: "secondary" as const,
      savings: "Economie R$ 288 por ano"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-warm/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-premium">
            <Crown className="w-4 h-4" />
            Planos Premium
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Escolha seu
            <span className="bg-gradient-primary bg-clip-text text-transparent"> investimento</span>
            <br />
            em alta performance
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Desenvolvido para executivos que entendem que <strong>tempo é dinheiro</strong> e 
            <strong> saúde é o maior patrimônio</strong>. Escolha o plano que se adapta ao seu ritmo.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-3xl border transition-all duration-300 hover:transform hover:scale-105 animate-slide-up ${
                plan.isPopular 
                  ? 'bg-gradient-primary text-primary-foreground border-primary shadow-premium scale-105' 
                  : 'bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-premium'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent-warm text-foreground px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-premium">
                    <Star className="w-4 h-4 fill-current" />
                    Mais Escolhido
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.isPopular ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.isPopular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
                
                <div className="mb-4">
                  {plan.originalPrice && (
                    <div className={`text-lg line-through ${plan.isPopular ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                      R$ {plan.originalPrice}
                    </div>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-5xl font-bold ${plan.isPopular ? 'text-primary-foreground' : 'text-foreground'}`}>
                      R$ {plan.price}
                    </span>
                    <span className={`text-lg ${plan.isPopular ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {plan.period}
                    </span>
                  </div>
                  {plan.savings && (
                    <div className={`text-sm mt-2 font-semibold ${plan.isPopular ? 'text-accent-warm' : 'text-primary'}`}>
                      {plan.savings}
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.isPopular 
                        ? 'bg-primary-foreground/20' 
                        : 'bg-primary/20'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.isPopular ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <span className={`text-sm leading-relaxed ${
                      plan.isPopular ? 'text-primary-foreground/90' : 'text-muted-foreground'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                variant={plan.isPopular ? "secondary" : plan.variant}
                size="lg" 
                className={`w-full text-lg font-semibold ${
                  plan.isPopular 
                    ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90' 
                    : ''
                }`}
              >
                {plan.isPopular ? (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Começar Agora
                  </>
                ) : (
                  'Escolher Plano'
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Trust & Guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-8 bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
              <span>Pagamento 100% Seguro</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow" style={{ animationDelay: '1s' }}></div>
              <span>Garantia de 7 dias</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow" style={{ animationDelay: '2s' }}></div>
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};