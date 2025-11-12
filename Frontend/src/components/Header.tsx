import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/Container';
import { ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/80 backdrop-blur-sm border-b border-border/50">
      <Container size="xl" className="py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-brand tracking-tight"
          >
            YummiFit.
          </motion.div>

          {/* Navigation Links */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <a
                  href="#sobre"
                  className="text-sm font-medium text-foreground hover:text-brand transition-colors"
                >
                  Sobre
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-foreground hover:text-brand data-[state=open]:text-brand">
                  Serviços
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-2">
                    <a
                      href="#servicos"
                      className="block px-3 py-2 text-sm rounded-md hover:bg-surface transition-colors"
                    >
                      Planos Nutricionais
                    </a>
                    <a
                      href="#servicos"
                      className="block px-3 py-2 text-sm rounded-md hover:bg-surface transition-colors"
                    >
                      Receitas com IA
                    </a>
                    <a
                      href="#servicos"
                      className="block px-3 py-2 text-sm rounded-md hover:bg-surface transition-colors"
                    >
                      Integração WhatsApp
                    </a>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#treinadores"
                  className="text-sm font-medium text-foreground hover:text-brand transition-colors"
                >
                  Treinadores
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <a
                  href="#contato"
                  className="text-sm font-medium text-foreground hover:text-brand transition-colors"
                >
                  Contato
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="outline"
              className="hidden sm:flex border-brand text-foreground hover:bg-brand/10"
            >
              Entrar
            </Button>
            <Button className="bg-brand text-ink hover:bg-brand-600">
              Cadastrar
            </Button>
          </motion.div>
        </nav>
      </Container>
    </header>
  );
}

