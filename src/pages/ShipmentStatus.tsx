import { useState } from 'react';
import { MessageCircle, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShipmentStatus as Status } from '@/lib/types';
import { toast } from 'sonner';

const STATUS_LABELS: Record<Status, string> = {
  zahtev_poslat: 'Zahtev poslat',
  prihvaceno: 'Prihvaćeno',
  u_toku: 'U toku',
  isporuceno: 'Isporučeno',
};

const STATUS_NEXT: Partial<Record<Status, Status>> = {
  zahtev_poslat: 'prihvaceno',
  prihvaceno: 'u_toku',
  u_toku: 'isporuceno',
};

const STATUS_NEXT_LABELS: Partial<Record<Status, string>> = {
  zahtev_poslat: 'Prihvati',
  prihvaceno: 'Započni isporuku',
  u_toku: 'Označi kao isporučeno',
};

const ShipmentStatusPage = () => {
  const { shipments, updateShipmentStatus, openShipmentChat, addReview, markShipmentReviewed } = useApp();
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
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Status pošiljke</h2>

      {shipments.map(shipment => {
        const nextStatus = STATUS_NEXT[shipment.status];
        const nextLabel = STATUS_NEXT_LABELS[shipment.status];

        return (
          <Card key={shipment.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{shipment.from} → {shipment.to}</span>
                <Badge variant={shipment.status === 'isporuceno' ? 'default' : 'secondary'}>
                  {STATUS_LABELS[shipment.status]}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Vozač: {shipment.driverName} • {shipment.date}
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => openShipmentChat(shipment.id)}>
                  <MessageCircle size={14} className="mr-1" /> Poruke
                </Button>
                {nextStatus && nextLabel && (
                  <Button size="sm" onClick={() => updateShipmentStatus(shipment.id, nextStatus)}>
                    {nextLabel}
                  </Button>
                )}
                {shipment.status === 'isporuceno' && !shipment.reviewed && (
                  <Button size="sm" variant="outline" onClick={() => setReviewDialog(shipment.id)}>
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
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className={`text-2xl transition-colors ${n <= rating ? 'text-primary' : 'text-muted'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Vaš komentar..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <Button
              onClick={() => reviewDialog && handleReview(reviewDialog)}
              className="w-full"
              disabled={!comment.trim()}
            >
              Pošalji recenziju
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShipmentStatusPage;
