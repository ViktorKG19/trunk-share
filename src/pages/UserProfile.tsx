import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Edit2, Save, X } from 'lucide-react';
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
  onBack: () => void;
}

const UserProfile = ({ userId, onBack }: UserProfileProps) => {
  const { reviews } = useApp();
  const { user, updateProfile } = useAuth();
  const isOwnProfile = user?.id === userId;

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editAge, setEditAge] = useState(String(user?.age || ''));
  const [editCity, setEditCity] = useState(user?.city || '');
  const [editBio, setEditBio] = useState(user?.bio || '');

  // Get profile data - for own profile use auth user, for others we need stored users
  const profileUser = isOwnProfile ? user : getStoredUser(userId);
  const userReviews = reviews.filter(r => r.toUserId === userId);
  const avgRating = userReviews.length > 0
    ? userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
    : 0;

  const handleSave = () => {
    updateProfile({ name: editName, age: parseInt(editAge), city: editCity, bio: editBio });
    setEditing(false);
  };

  if (!profileUser) {
    return (
      <div className="p-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft size={16} className="mr-1" /> Nazad
        </Button>
        <p className="text-muted-foreground text-center py-8">Korisnik nije pronađen.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Button variant="ghost" size="sm" onClick={onBack}>
        <ArrowLeft size={16} className="mr-1" /> Nazad
      </Button>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">{profileUser.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>{profileUser.age} god.</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{profileUser.city}</span>
                </div>
              </div>
            </div>
            {isOwnProfile && !editing && (
              <Button variant="ghost" size="icon" onClick={() => {
                setEditName(user!.name);
                setEditAge(String(user!.age));
                setEditCity(user!.city);
                setEditBio(user!.bio);
                setEditing(true);
              }}>
                <Edit2 size={16} />
              </Button>
            )}
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

          {profileUser.bio && !editing && (
            <p className="text-sm text-muted-foreground">{profileUser.bio}</p>
          )}

          {/* Edit form */}
          {editing && (
            <div className="space-y-3 pt-2 border-t border-border">
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
            {userReviews.map(review => (
              <Card key={review.id}>
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

// Helper to get other users from localStorage
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
