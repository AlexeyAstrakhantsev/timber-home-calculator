
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Building } from 'lucide-react';

// Define Google Maps types
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps script dynamically
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Define the callback function in window
      window.initMap = () => {
        setMapLoaded(true);
      };
      
      document.head.appendChild(script);
    }

    // Clean up function
    return () => {
      const script = document.getElementById('google-maps-script');
      if (script) {
        document.head.removeChild(script);
      }
      // Remove the global callback
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current && window.google) {
      try {
        // Create the map
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 51.834, lng: 107.584 }, // Coordinates for Ulan-Ude
          zoom: 14,
          styles: [
            {
              "featureType": "all",
              "elementType": "geometry.fill",
              "stylers": [{ "weight": "2.00" }]
            },
            {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [{ "color": "#f2f2f2" }]
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": [{ "color": "#acc9ed" }]
            }
          ]
        });
        
        // Add marker for company location
        const marker = new window.google.maps.Marker({
          position: { lat: 51.834, lng: 107.584 },
          map: map,
          title: 'ЭкоДом Байкал'
        });
        
        // Add info window
        const infowindow = new window.google.maps.InfoWindow({
          content: '<div style="padding: 10px;"><strong>ЭкоДом Байкал</strong><br>Строительство домов из бруса</div>'
        });
        
        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }
  }, [mapLoaded]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="glass-card lg:col-span-1">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-6">Контактная информация</h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Building className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">ООО "ЭкоДом Байкал"</h4>
                <p className="text-muted-foreground">Строительство домов из бруса в Улан-Удэ и Республике Бурятия</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Адрес</h4>
                <p className="text-muted-foreground">г. Улан-Удэ, ул. Ленина, 123</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Телефон</h4>
                <a href="tel:+79991234567" className="text-muted-foreground hover:text-primary">
                  +7 (999) 123-45-67
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">E-mail</h4>
                <a href="mailto:info@ecodombaikal.ru" className="text-muted-foreground hover:text-primary">
                  info@ecodombaikal.ru
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Режим работы</h4>
                <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                <p className="text-muted-foreground">Сб: 10:00 - 15:00</p>
                <p className="text-muted-foreground">Вс: выходной</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2 h-[400px] rounded-lg overflow-hidden relative">
        <div id="map" ref={mapRef} className="w-full h-full bg-slate-200">
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Загрузка карты...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
