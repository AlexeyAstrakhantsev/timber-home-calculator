
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  const scrollToCalculators = () => {
    const calculatorsSection = document.getElementById('calculators');
    if (calculatorsSection) {
      const offsetTop = calculatorsSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      id="home"
      className="relative min-h-[100vh] flex items-center justify-center bg-cover bg-center pt-16"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2669&q=80")'
      }}
    >
      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 text-center">
        <AnimatedSection animation="fade-in-down">
          <div className="inline-block mb-6 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/30 text-white">
            <span>Строительство из экологичного материала в Улан-Удэ</span>
          </div>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in" delay={200}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Дома из бруса <br />
            с заботой о вашем будущем
          </h1>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={400}>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Мы строим качественные деревянные дома, которые прослужат поколениям, сохраняя тепло и уют вашей семьи
          </p>
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in-up" delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToCalculators}
              className="bg-primary/90 hover:bg-primary text-white text-lg py-6 px-8"
            >
              Рассчитать стоимость
            </Button>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 text-lg py-6 px-8"
            >
              Связаться с нами
            </Button>
          </div>
        </AnimatedSection>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <button 
          onClick={scrollToCalculators} 
          className="animate-bounce bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/30 text-white"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
