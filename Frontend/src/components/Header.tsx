import CardNav, { CardNavItem } from "@/components/ui/CardNav";
import YummiFitLogo from "@/media/LogoYummiFit.svg";

export const Header = () => {
  const items: CardNavItem[] = [
    {
      label: "Sobre",
      bgColor: "linear-gradient(135deg, #7DA32E 0%, #46B47D 100%)",
      textColor: "#fff",
      links: [
        { label: "Nossa História", href: "#sobre", ariaLabel: "Ir para Nossa História" },
        { label: "Como Funciona", href: "#como-funciona", ariaLabel: "Ir para Como Funciona" }
      ]
    },
    {
      label: "Recursos",
      bgColor: "linear-gradient(135deg, #46B47D 0%, #98B63B 100%)",
      textColor: "#fff",
      links: [
        { label: "Perguntas Frequentes", href: "#faq", ariaLabel: "Ver perguntas frequentes" },
        { label: "Planos", href: "#precos", ariaLabel: "Ver planos e preços" }
      ]
    },
    {
      label: "Contato",
      bgColor: "linear-gradient(135deg, #98B63B 0%, #CAE266 100%)",
      textColor: "#fff",
      links: [
        { label: "WhatsApp", href: "#precos", ariaLabel: "Falar no WhatsApp" },
        { label: "Email", href: "mailto:contato@yummifit.com", ariaLabel: "Enviar email" },
        { label: "LinkedIn", href: "https://www.linkedin.com", ariaLabel: "Abrir LinkedIn" }
      ]
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <CardNav
        logo={YummiFitLogo}
        logoAlt="YummiFit Logo"
        items={items}
        baseColor="#ffffff"
        menuColor="#111111"
        buttonBgColor="#111111"
        buttonTextColor="#ffffff"
        ease="power3.out"
      />
    </header>
  );
};