import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { SERBIAN_CITIES } from '@/lib/constants';
import { toast } from 'sonner';

const PublishRoute = () => {
  const { addRoute } = useApp();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !date || !time || !slots) {
      toast.error('Popunite sva polja');
      return;
    }
    if (from === to) {
      toast.error('Grad polaska i dolaska ne mogu biti isti');
      return;
    }
    addRoute({ from, to, date, time, availableSlots: parseInt(slots) });
    toast.success('Ruta je uspešno objavljena!');
    setFrom(''); setTo(''); setDate(''); setTime(''); setSlots('');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-1">Objavi rutu</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Ponudi svoj prtljažnik putnicima
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Grad polaska</Label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger><SelectValue placeholder="Izaberi grad" /></SelectTrigger>
            <SelectContent>
              {SERBIAN_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Grad dolaska</Label>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger><SelectValue placeholder="Izaberi grad" /></SelectTrigger>
            <SelectContent>
              {SERBIAN_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Datum</Label>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Vreme polaska</Label>
          <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Broj paketa koji mogu stati</Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={slots}
            onChange={e => setSlots(e.target.value)}
            placeholder="npr. 3"
          />
        </div>

        <Button type="submit" className="w-full">
          Objavi rutu
        </Button>
      </form>
    </div>
  );
};

export default PublishRoute;
