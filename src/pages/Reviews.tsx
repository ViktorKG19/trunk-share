import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

const Reviews = () => {
  const { reviews } = useApp();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Recenzije</h2>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">Nema recenzija.</p>
      ) : (
        reviews.map(review => (
          <Card key={review.id}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{review.toUserName}</span>
                <Badge variant="outline" className="text-xs">
                  {review.type === 'vozac' ? 'Za vozača' : 'Za pošiljaoca'}
                </Badge>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(n => (
                  <Star
                    key={n}
                    size={16}
                    className={n <= review.rating ? 'text-primary fill-primary' : 'text-muted'}
                  />
                ))}
              </div>
              <p className="text-sm">{review.comment}</p>
              <p className="text-xs text-muted-foreground">
                Od: {review.fromUserName} • {review.date}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Reviews;
