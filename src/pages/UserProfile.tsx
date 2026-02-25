import { useState } from 'react';
import { Star, MapPin, Edit2, Save, X, BadgeCheck, Package, Clock, ThumbsUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { SERBIAN_CITIES } from '@/lib/constants';
import { User } from '@/lib/types';

interface UserProfileProps {
  userId: string;
  onBack?: () => void;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const { reviews, getDemoUser } = useApp();
  const { user, updateProfile } = useAuth();
  const isOwnProfile = user?.id === userId;

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editAge, setEditAge] = useState(String(user?.age || ''));
  const [editCity, setEditCity] = useState(user?.city || '');
  const [editBio, setEditBio] = useState(user?.bio || '');

  const profileUser: User | null | undefined = isOwnProfile ? user : (getDemoUser(userId) || getStoredUser(userId));
  const userReviews = reviews.filter(r => r.toUserId === userId);
  const avgRating = userReviews.length > 0
    ? userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
    : 0;
  const positivePercent = userReviews.length > 0
    ? Math.round((userReviews.filter(r => r.rating >= 4).length / userReviews.length) * 100)
    : 0;

  const deliveryCount = profileUser?.deliveryCount || userReviews.length * 3;
  const avgResponseTime = profileUser?.avgResponseTime || '5 min';
  const isVerified = profileUser?.verified || false;

  const handleSave = () => {
    updateProfile({ name: editName, age: parseInt(editAge), city: editCity, bio: editBio });
    setEditing(false);
  };

  if (!profileUser) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground text-center py-8">Korisnik nije pronađen.</p>
      </div>
    );
  }

  const initials = profileUser.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <Card className="overflow-hidden">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold truncate">{profileUser.name}</h2>
                {isVerified && (
                  <BadgeCheck size={20} className="text-primary shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>{profileUser.age} god.</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{profileUser.city}</span>
                </div>
              </div>
              {isOwnProfile && !editing && (
                <Button variant="ghost" size="sm" className="mt-1 -ml-2 text-xs" onClick={() => {
                  setEditName(user!.name);
                  setEditAge(String(user!.age));
                  setEditCity(user!.city);
                  setEditBio(user!.bio);
                  setEditing(true);
                }}>
                  <Edit2 size={14} className="mr-1" /> Izmeni profil
                </Button>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(n => (
                <Star key={n} size={18} className={n <= Math.round(avgRating) ? 'text-primary fill-primary' : 'text-muted'} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {avgRating > 0 ? `${avgRating.toFixed(1)} (${userReviews.length})` : 'Nema ocena'}
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-accent/50 rounded-lg p-3 text-center">
              <Package size={18} className="mx-auto text-primary mb-1" />
              <p className="text-lg font-bold text-foreground">{deliveryCount}</p>
              <p className="text-xs text-muted-foreground">Isporučeno</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-3 text-center">
              <ThumbsUp size={18} className="mx-auto text-primary mb-1" />
              <p className="text-lg font-bold text-foreground">{positivePercent}%</p>
              <p className="text-xs text-muted-foreground">Pozitivne ocene</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-3 text-center">
              <Star size={18} className="mx-auto text-primary mb-1" />
              <p className="text-lg font-bold text-foreground">{userReviews.length}</p>
              <p className="text-xs text-muted-foreground">Recenzija</p>
            </div>
            <div className="bg-accent/50 rounded-lg p-3 text-center">
              <Clock size={18} className="mx-auto text-primary mb-1" />
              <p className="text-lg font-bold text-foreground">{avgResponseTime}</p>
              <p className="text-xs text-muted-foreground">Prosečan odgovor</p>
            </div>
          </div>

          {profileUser.bio && !editing && (
            <p className="text-sm text-muted-foreground">{profileUser.bio}</p>
          )}

          {isVerified && (
            <Badge variant="outline" className="text-primary border-primary/30">
              <BadgeCheck size={14} className="mr-1" /> Verifikovan korisnik
            </Badge>
          )}

          {/* Edit form */}
          {editing && (
            <div className="space-y-3 pt-2 border-t border-border animate-fade-in">
              <div className="space-y-2">
                <Label>Ime i prezime</Label>
                <Input value={editName} onChange={e => setEditName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Godine</Label>
                <Input type="number" min="16" max="99" value={editAge} onChange={e => setEditAge(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Grad</Label>
                <Select value={editCity} onValueChange={setEditCity}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SERBIAN_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Kratak opis</Label>
                <Textarea value={editBio} onChange={e => setEditBio(e.target.value)} placeholder="Recite nešto o sebi..." rows={3} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1"><Save size={14} className="mr-1" /> Sačuvaj</Button>
                <Button variant="outline" onClick={() => setEditing(false)}><X size={14} /></Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews */}
      <div>
        <h3 className="font-semibold mb-3">Recenzije ({userReviews.length})</h3>
        {userReviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">Još nema recenzija.</p>
        ) : (
          <div className="space-y-3">
            {userReviews.map((review, i) => (
              <Card key={review.id} className="transition-all duration-300 hover:shadow-md" style={{ animationDelay: `${i * 50}ms` }}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{review.fromUserName}</span>
                    <Badge variant="outline" className="text-xs">
                      {review.type === 'vozac' ? 'Za vozača' : 'Za pošiljaoca'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star key={n} size={14} className={n <= review.rating ? 'text-primary fill-primary' : 'text-muted'} />
                    ))}
                  </div>
                  <p className="text-sm">{review.comment}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function getStoredUser(userId: string): User | null {
  try {
    const data = localStorage.getItem('trunkshare_users');
    if (!data) return null;
    const users = JSON.parse(data);
    const found = users.find((u: any) => u.id === userId);
    if (!found) return null;
    return { id: found.id, name: found.name, email: found.email, age: found.age || 0, city: found.city || '', bio: found.bio || '' };
  } catch { return null; }
}

export default UserProfile;
