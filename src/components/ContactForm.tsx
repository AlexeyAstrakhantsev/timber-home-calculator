
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Заявка успешно отправлена', {
        description: 'Мы свяжемся с вами в ближайшее время',
        duration: 5000
      });

      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-2xl">Оставьте заявку</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Ваше имя <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting || isSubmitted}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block mb-2 font-medium">
              Телефон <span className="text-red-500">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting || isSubmitted}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              E-mail
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.ru"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting || isSubmitted}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block mb-2 font-medium">
              Сообщение
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Опишите ваш запрос..."
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting || isSubmitted}
              className="input-field min-h-[120px]"
            />
          </div>
          
          <Button
            type="submit"
            className={`w-full mt-6 py-6 ${
              isSubmitted ? 'bg-green-600 hover:bg-green-600' : 'button-primary'
            }`}
            disabled={isSubmitting || isSubmitted}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : isSubmitted ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Заявка отправлена
              </>
            ) : (
              'Отправить заявку'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
