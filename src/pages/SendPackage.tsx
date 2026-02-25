import { useState } from 'react';
import { Search, MapPin, Calendar, Package, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { SERBIAN_CITIES } from '@/lib/constants';
import { TrunkRoute } from '@/lib/types';

const SendPackage = () => {
  const { searchRoutes, openRouteChat } = useApp();
  const [from, setFrom] = useState('');
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<TrunkRoute[]>([]);

  const handleSearch = () => {
    if (!from) return;
    const found = searchRoutes(from);
    setResults(found);
    setSearched(true);
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-xl font-bold">Pošalji paket</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Pronađi vozača koji putuje tvojom rutom
        </p>
      </div>

      <div className="space-y-3">
        <Select value={from} onValueChange={setFrom}>
          <SelectTrigger>
            <SelectValue placeholder="Grad polaska" />
          </SelectTrigger>
          <SelectContent>
            {SERBIAN_CITIES.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} className="w-full" disabled={!from}>
          <Search size={16} className="mr-2" />
          Pretraži
        </Button>
      </div>

      {searched && results.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Nema dostupnih ruta iz grada {from}.
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-3 mt-2">
          <p className="text-sm font-medium text-muted-foreground">
            Pronađeno ruta: {results.length}
          </p>
          {results.map(route => (
            <Card key={route.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <User size={16} className="text-primary" />
                  </div>
                  <span className="font-medium">{route.driverName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span>{route.from} → {route.to}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{route.date} u {route.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package size={14} />
                    <span>{route.availableSlots} {route.availableSlots === 1 ? 'mesto' : 'mesta'}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => openRouteChat(route.id)}
                >
                  Kontaktiraj vozača
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SendPackage;
