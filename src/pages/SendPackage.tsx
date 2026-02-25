import { useState } from 'react';
import { Search, MapPin, Calendar, Package, BadgeCheck } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { useApp } from '@/contexts/AppContext';
import { SERBIAN_CITIES } from '@/lib/constants';
import { TrunkRoute } from '@/lib/types';

const SendPackage = () => {
  const { searchRoutes, openRouteChat, openUserProfile } = useApp();
  const [from, setFrom] = useState('');
  const [date, setDate] = useState<Date>();
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TrunkRoute[]>([]);

  const handleSearch = () => {
    if (!from || !date) return;
    setLoading(true);
    setSearched(false);
    // Simulate loading for realism
    setTimeout(() => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const found = searchRoutes(from, dateStr);
      setResults(found);
      setSearched(true);
      setLoading(false);
    }, 800);
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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <Calendar size={16} className="mr-2" />
              {date ? format(date, 'dd.MM.yyyy') : 'Izaberite datum'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>

        <Button onClick={handleSearch} className="w-full" disabled={!from || !date}>
          <Search size={16} className="mr-2" />
          Pretraži
        </Button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3 mt-2">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-9 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searched && !loading && results.length === 0 && (
        <p className="text-center text-muted-foreground py-8 animate-fade-in">
          Nema dostupnih ruta za izabrani grad i datum.
        </p>
      )}

      {searched && !loading && results.length > 0 && (
        <div className="space-y-3 mt-2 animate-fade-in">
          <p className="text-sm font-medium text-muted-foreground">
            Pronađeno ruta: {results.length}
          </p>
          {results.map((route, i) => {
            const initials = route.driverName.split(' ').map(n => n[0]).join('').toUpperCase();
            return (
              <Card key={route.id} className="transition-all duration-300 hover:shadow-md" style={{ animationDelay: `${i * 80}ms` }}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                      {initials}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => openUserProfile(route.driverId)} className="font-medium text-primary hover:underline">
                        {route.driverName}
                      </button>
                      {route.driverVerified && <BadgeCheck size={16} className="text-primary" />}
                    </div>
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
                  <Button variant="outline" className="w-full transition-all duration-200 hover:bg-primary hover:text-primary-foreground" onClick={() => openRouteChat(route.id)}>
                    Kontaktiraj vozača
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SendPackage;
