import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import logo from '@/assets/logo.webp';
import { toast } from 'sonner';

const Auth = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email, password)) {
      toast.error('Pogrešan email ili lozinka');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Lozinke se ne poklapaju');
      return;
    }
    if (password.length < 6) {
      toast.error('Lozinka mora imati najmanje 6 karaktera');
      return;
    }
    if (!register(name, email, password)) {
      toast.error('Nalog sa ovim emailom već postoji');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="TrunkShare logo" className="h-16 mb-4" />
          <h1 className="text-2xl font-bold text-foreground">TrunkShare</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pošaljite paket sa pouzdanim vozačem
          </p>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <h2 className="text-lg font-semibold text-center">
              {isRegister ? 'Kreiraj nalog' : 'Prijavi se'}
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name">Ime i prezime</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Vaše ime i prezime"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="vas@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Lozinka</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>
              {isRegister && (
                <div className="space-y-2">
                  <Label htmlFor="confirm">Potvrda lozinke</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                {isRegister ? 'Kreiraj nalog' : 'Prijavi se'}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              {isRegister ? 'Već imaš nalog? ' : 'Nemaš nalog? '}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-primary font-medium hover:underline"
              >
                {isRegister ? 'Prijavi se' : 'Registruj se'}
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
