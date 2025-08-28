import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import YummiFitLogo from "@/media/YummiFitLogo_HQ.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={YummiFitLogo} 
              alt="YummiFit Logo" 
              className="h-32 w-auto mix-blend-multiply"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-foreground hover:text-primary transition-colors font-medium">
              Como Funciona
            </a>
            <a href="#sobre" className="text-foreground hover:text-primary transition-colors font-medium">
              Nossa História
            </a>
            <a href="#precos" className="text-foreground hover:text-primary transition-colors font-medium">
              Preços
            </a>
            <Button variant="premium" size="lg">
              Começar Agora
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border/50 p-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <a href="#como-funciona" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Como Funciona
              </a>
              <a href="#sobre" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Nossa História  
              </a>
              <a href="#precos" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Preços
              </a>
              <Button variant="premium" size="lg" className="mt-4">
                Começar Agora
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};