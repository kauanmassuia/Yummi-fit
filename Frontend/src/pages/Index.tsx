import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
// Aurora background is used only in the Hero section

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-0">
        <Hero />
        <div id="como-funciona">
          <Features />
        </div>
        <div id="sobre">
          <About />
        </div>
        <div id="precos">
          <Pricing />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;