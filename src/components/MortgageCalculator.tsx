
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const MortgageCalculator = () => {
  // Default values
  const [propertyValue, setPropertyValue] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [loanTerm, setLoanTerm] = useState(20);
  const [interestRate, setInterestRate] = useState(7.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Calculate the mortgage details
  const calculateMortgage = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const principal = propertyValue - downPayment;
      const monthlyInterest = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      
      // Calculate monthly payment using the mortgage formula
      const x = Math.pow(1 + monthlyInterest, numberOfPayments);
      const monthly = (principal * x * monthlyInterest) / (x - 1);
      
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * numberOfPayments);
      setIsCalculating(false);
    }, 400);
  };

  useEffect(() => {
    calculateMortgage();
  }, [propertyValue, downPayment, loanTerm, interestRate]);

  // Ensure down payment doesn't exceed property value
  useEffect(() => {
    if (downPayment > propertyValue * 0.9) {
      setDownPayment(Math.floor(propertyValue * 0.9));
    }
  }, [propertyValue]);

  // Handler for property value input
  const handlePropertyValueChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, ''));
    if (!isNaN(numValue) && numValue >= 1000000) {
      setPropertyValue(numValue);
    }
  };

  // Handler for down payment input
  const handleDownPaymentChange = (value: string) => {
    const numValue = parseInt(value.replace(/\D/g, ''));
    if (!isNaN(numValue) && numValue >= 0) {
      setDownPayment(Math.min(numValue, propertyValue * 0.9));
    }
  };

  const consultWithSpecialist = () => {
    toast.success('Заявка на консультацию отправлена', {
      description: 'Специалист по ипотеке свяжется с вами в ближайшее время',
      duration: 5000
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="bg-wood-light/30">
        <CardTitle className="text-2xl">Ипотечный калькулятор</CardTitle>
        <CardDescription>
          Рассчитайте ежемесячный платеж и условия ипотеки
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="calculator">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator">Калькулятор</TabsTrigger>
            <TabsTrigger value="results">Результаты</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="space-y-6">
            <div className="space-y-2">
              <label className="font-medium">Стоимость дома:</label>
              <Input 
                type="text" 
                value={formatCurrency(propertyValue).replace('₽', '').trim()}
                onChange={(e) => handlePropertyValueChange(e.target.value)}
                className="input-field"
              />
              <Slider
                value={[propertyValue]}
                min={1000000}
                max={20000000}
                step={100000}
                onValueChange={(value) => setPropertyValue(value[0])}
                className="py-4"
              />
              <span className="flex justify-between text-sm text-muted-foreground">
                <span>1 млн ₽</span>
                <span>20 млн ₽</span>
              </span>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Первоначальный взнос:</label>
              <Input 
                type="text" 
                value={formatCurrency(downPayment).replace('₽', '').trim()}
                onChange={(e) => handleDownPaymentChange(e.target.value)}
                className="input-field"
              />
              <Slider
                value={[downPayment]}
                min={0}
                max={propertyValue * 0.9}
                step={50000}
                onValueChange={(value) => setDownPayment(value[0])}
                className="py-4"
              />
              <span className="flex justify-between text-sm text-muted-foreground">
                <span>0 ₽</span>
                <span>{formatCurrency(propertyValue * 0.9)}</span>
              </span>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Срок кредита: {loanTerm} лет</label>
              <Slider
                value={[loanTerm]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setLoanTerm(value[0])}
                className="py-4"
              />
              <span className="flex justify-between text-sm text-muted-foreground">
                <span>1 год</span>
                <span>30 лет</span>
              </span>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Процентная ставка: {interestRate}%</label>
              <Slider
                value={[interestRate]}
                min={4}
                max={15}
                step={0.1}
                onValueChange={(value) => setInterestRate(value[0])}
                className="py-4"
              />
              <span className="flex justify-between text-sm text-muted-foreground">
                <span>4%</span>
                <span>15%</span>
              </span>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-6">
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Сумма кредита:</span>
                  <span className="font-medium">{formatCurrency(propertyValue - downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Процентная ставка:</span>
                  <span className="font-medium">{interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Срок кредита:</span>
                  <span className="font-medium">{loanTerm} лет ({loanTerm * 12} платежей)</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Ежемесячный платеж:</span>
                  <span className="text-2xl font-bold text-primary">
                    {isCalculating ? 'Расчет...' : formatCurrency(monthlyPayment)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Общая сумма выплат:</span>
                  <span className="font-medium">{isCalculating ? 'Расчет...' : formatCurrency(totalPayment)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Переплата по кредиту:</span>
                  <span className="font-medium">
                    {isCalculating ? 'Расчет...' : formatCurrency(totalPayment - (propertyValue - downPayment))}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="border-t border-border pt-6 mt-6">
          <Button 
            onClick={consultWithSpecialist}
            className="w-full button-primary"
          >
            Консультация с ипотечным специалистом
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;
