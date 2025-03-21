
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-wood-dark/90 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">ЭкоДом Байкал</h3>
            <p className="text-white/80 mb-4">
              Строительство экологичных домов из бруса в Улан-Удэ и Республике Бурятия
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <a href="tel:+79991234567" className="flex items-center gap-2 text-white/80 hover:text-white">
                <Phone size={18} />
                <span>+7 (999) 123-45-67</span>
              </a>
              <a href="mailto:info@ecodombaikal.ru" className="flex items-center gap-2 text-white/80 hover:text-white">
                <Mail size={18} />
                <span>info@ecodombaikal.ru</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#" className="hover:text-white">О компании</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Проекты домов</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Цены и услуги</a>
              </li>
              <li>
                <a href="#" className="hover:text-white">Политика конфиденциальности</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/60 text-sm">
          <p>&copy; {currentYear} ЭкоДом Байкал. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
