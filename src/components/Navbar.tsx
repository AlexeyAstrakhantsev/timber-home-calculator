
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Home, Calculator, Phone, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollTo = (id: string) => {
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-wood-dark text-xl md:text-2xl font-bold font-['Playfair_Display']">
              ЭкоДом Байкал
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollTo('home')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Home size={18} />
              <span>Главная</span>
            </button>
            <button 
              onClick={() => scrollTo('calculators')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Calculator size={18} />
              <span>Калькуляторы</span>
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Phone size={18} />
              <span>Контакты</span>
            </button>
            <a 
              href="tel:+79991234567" 
              className="button-primary flex items-center text-sm"
            >
              +7 (999) 123-45-67
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-lg z-40 transition-all duration-300 md:hidden pt-20",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-6">
          <button 
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-3 border-b border-border"
          >
            <Home size={20} />
            <span className="text-xl">Главная</span>
          </button>
          <button 
            onClick={() => scrollTo('calculators')}
            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-3 border-b border-border"
          >
            <Calculator size={20} />
            <span className="text-xl">Калькуляторы</span>
          </button>
          <button 
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors py-3 border-b border-border"
          >
            <Phone size={20} />
            <span className="text-xl">Контакты</span>
          </button>
          <a 
            href="tel:+79991234567" 
            className="button-primary flex items-center justify-center text-base mt-4"
          >
            +7 (999) 123-45-67
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
