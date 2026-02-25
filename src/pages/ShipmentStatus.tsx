import { useState } from 'react';
import { MessageCircle, Star, BadgeCheck, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShipmentStatus as Status } from '@/lib/types';
import { toast } from 'sonner';

const STATUS_LABELS_SENDER: Record<Status, string> = {
  zahtev_poslat: 'Zahtev poslat',
  prihvaceno: 'Prihvaćeno',
  u_toku: 'U toku',
  isporuceno: 'Isporučeno',
};

const STATUS_LABELS_DRIVER: Record<Status, string> = {
  zahtev_poslat: 'Primljen zahtev',
  prihvaceno: 'Prihvaćeno',
  u_toku: 'U toku',
  isporuceno: 'Isporučeno',
};

const STATUS_COLORS: Record<Status, string> = {
  zahtev_poslat: 'bg-muted text-muted-foreground',
  prihvaceno: 'bg-primary/10 text-primary',
  u_toku: 'bg-accent text-accent-foreground',
  isporuceno: 'bg-primary text-primary-foreground',
};

const STATUS_STEPS: Status[] = ['zahtev_poslat', 'prihvaceno', 'u_toku', 'isporuceno'];

const ShipmentStatusPage = () => {
  const { shipments, updateShipmentStatus, openShipmentChat, addReview, markShipmentReviewed, openUserProfile } = useApp();
  const { user } = useAuth();
  const [reviewDialog, setReviewDialog] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleReview = (shipmentId: string) => {
    const shipment = shipments.find(s => s.id === shipmentId);
    if (!shipment || !user) return;
    const isDriver = shipment.driverId === user.id;
    addReview({
      fromUserId: user.id,
      fromUserName: user.name,
      toUserId: isDriver ? shipment.senderId : shipment.driverId,
      toUserName: isDriver ? shipment.senderName : shipment.driverName,
      rating,
      comment,
      type: isDriver ? 'posiljalac' : 'vozac',
    });
    markShipmentReviewed(shipmentId);
    setReviewDialog(null);
    setComment('');
    setRating(5);
    toast.success('Recenzija je uspešno ostavljena!');
  };

  if (shipments.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">Status pošiljke</h2>
        <p className="text-muted-foreground text-sm py-8 text-center">
          Nemate aktivnih pošiljki.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold">Status pošiljke</h2>

      {shipments.map(shipment => {
        const isDriver = shipment.driverId === user?.id;
        const labels = isDriver ? STATUS_LABELS_DRIVER : STATUS_LABELS_SENDER;
        const currentStepIndex = STATUS_STEPS.indexOf(shipment.status);

        // Determine next action
        let nextStatus: Status | undefined;
        let nextLabel: string | undefined;
        if (isDriver) {
          if (shipment.status === 'zahtev_poslat') { nextStatus = 'prihvaceno'; nextLabel = 'Prihvati zahtev'; }
          else if (shipment.status === 'prihvaceno') { nextStatus = 'u_toku'; nextLabel = 'Započni isporuku'; }
          else if (shipment.status === 'u_toku') { nextStatus = 'isporuceno'; nextLabel = 'Označi kao isporučeno'; }
        }

        return (
          <Card key={shipment.id} className="transition-all duration-300 hover:shadow-md overflow-hidden">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{shipment.from} → {shipment.to}</span>
                <Badge className={STATUS_COLORS[shipment.status]}>
                  {labels[shipment.status]}
                </Badge>
              </div>

              {/* Progress bar */}
              <div className="flex gap-1">
                {STATUS_STEPS.map((step, i) => (
                  <div key={step} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i <= currentStepIndex ? 'bg-primary' : 'bg-muted'
                  }`} />
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                {isDriver ? 'Pošiljalac: ' : 'Vozač: '}
                <button
                  onClick={() => openUserProfile(isDriver ? shipment.senderId : shipment.driverId)}
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  {isDriver ? shipment.senderName : shipment.driverName}
                </button>
                {' • '}{shipment.date}
              </p>

              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => openShipmentChat(shipment.id)} className="transition-all duration-200">
                  <MessageCircle size={14} className="mr-1" /> Poruke
                </Button>
                {nextStatus && nextLabel && (
                  <Button size="sm" onClick={() => updateShipmentStatus(shipment.id, nextStatus!)} className="transition-all duration-200">
                    {nextLabel} <ChevronRight size={14} className="ml-1" />
                  </Button>
                )}
                {shipment.status === 'isporuceno' && !shipment.reviewed && (
                  <Button size="sm" variant="outline" onClick={() => setReviewDialog(shipment.id)} className="transition-all duration-200">
                    <Star size={14} className="mr-1" /> Oceni
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Dialog open={!!reviewDialog} onOpenChange={() => setReviewDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ostavi recenziju</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-1 justify-center">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setRating(n)} className={`text-3xl transition-all duration-200 hover:scale-110 ${n <= rating ? 'text-primary' : 'text-muted'}`}>
                  ★
                </button>
              ))}
            </div>
            <Textarea placeholder="Vaš komentar..." value={comment} onChange={e => setComment(e.target.value)} />
            <Button onClick={() => reviewDialog && handleReview(reviewDialog)} className="w-full" disabled={!comment.trim()}>
              Pošalji recenziju
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShipmentStatusPage;
