
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ConstructionCalculator from '@/components/ConstructionCalculator';
import MortgageCalculator from '@/components/MortgageCalculator';
import ContactForm from '@/components/ContactForm';
import Map from '@/components/Map';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const Index = () => {
  // Add smooth scrolling behavior for the whole page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <section id="calculators" className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="section-title">Рассчитайте стоимость</h2>
                <p className="section-subtitle">
                  Используйте наши калькуляторы, чтобы оценить стоимость строительства и ежемесячный платеж по ипотеке
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatedSection animation="slide-in-left">
                <ConstructionCalculator />
              </AnimatedSection>
              
              <AnimatedSection animation="slide-in-right" delay={200}>
                <MortgageCalculator />
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        <section id="contact" className="py-20 bg-wood-pattern">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="section-title">Свяжитесь с нами</h2>
                <p className="section-subtitle">
                  Оставьте заявку и наши специалисты проконсультируют вас по всем вопросам
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <AnimatedSection animation="fade-in-up">
                <ContactForm />
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in-up" delay={200}>
                <div className="glass-card p-6 h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold mb-6">Почему выбирают нас</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">01</div>
                      <div>
                        <h4 className="font-medium text-lg">Экологичные материалы</h4>
                        <p className="text-muted-foreground">Мы используем только качественный брус из экологически чистых районов Бурятии</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">02</div>
                      <div>
                        <h4 className="font-medium text-lg">Опыт и профессионализм</h4>
                        <p className="text-muted-foreground">Более 10 лет опыта в строительстве домов из бруса</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">03</div>
                      <div>
                        <h4 className="font-medium text-lg">Гарантия качества</h4>
                        <p className="text-muted-foreground">Мы даем гарантию на все выполненные работы и используемые материалы</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection animation="fade-in-up" delay={300}>
              <Map />
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
