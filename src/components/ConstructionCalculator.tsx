
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const HOUSE_TYPES = [
  { id: 'standard', name: 'Стандартный', coefficient: 1.0 },
  { id: 'premium', name: 'Премиум', coefficient: 1.4 },
  { id: 'elite', name: 'Элитный', coefficient: 1.8 }
];

const TIMBER_TYPES = [
  { id: 'pine', name: 'Сосна', pricePerSquareMeter: 18000 },
  { id: 'larch', name: 'Лиственница', pricePerSquareMeter: 24000 },
  { id: 'cedar', name: 'Кедр', pricePerSquareMeter: 30000 }
];

const ConstructionCalculator = () => {
  const [area, setArea] = useState(100);
  const [houseType, setHouseType] = useState(HOUSE_TYPES[0].id);
  const [timberType, setTimberType] = useState(TIMBER_TYPES[0].id);
  const [totalCost, setTotalCost] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const selectedHouseType = HOUSE_TYPES.find(type => type.id === houseType) || HOUSE_TYPES[0];
  const selectedTimberType = TIMBER_TYPES.find(type => type.id === timberType) || TIMBER_TYPES[0];

  const calculateCost = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const cost = area * selectedTimberType.pricePerSquareMeter * selectedHouseType.coefficient;
      setTotalCost(cost);
      setIsCalculating(false);
    }, 500);
  };

  useEffect(() => {
    calculateCost();
  }, [area, houseType, timberType]);

  const requestQuote = () => {
    toast.success('Заявка отправлена', {
      description: 'Мы свяжемся с вами в ближайшее время',
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
        <CardTitle className="text-2xl">Расчет стоимости строительства</CardTitle>
        <CardDescription>
          Укажите параметры дома для расчета примерной стоимости
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-medium">Площадь дома: {area} м²</label>
            <Slider
              value={[area]}
              min={50}
              max={300}
              step={5}
              onValueChange={(value) => setArea(value[0])}
              className="py-4"
            />
            <span className="flex justify-between text-sm text-muted-foreground">
              <span>50 м²</span>
              <span>300 м²</span>
            </span>
          </div>

          <div className="space-y-2">
            <label className="font-medium">Тип дома:</label>
            <Select value={houseType} onValueChange={setHouseType}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип дома" />
              </SelectTrigger>
              <SelectContent>
                {HOUSE_TYPES.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="font-medium">Материал:</label>
            <Select value={timberType} onValueChange={setTimberType}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите материал" />
              </SelectTrigger>
              <SelectContent>
                {TIMBER_TYPES.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-t border-border pt-6 mt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-lg">Примерная стоимость:</span>
              <span className="text-2xl font-bold text-primary">
                {isCalculating ? 'Расчет...' : formatCurrency(totalCost)}
              </span>
            </div>
            <Button 
              onClick={requestQuote}
              className="w-full button-primary"
            >
              Получить точную смету
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConstructionCalculator;
