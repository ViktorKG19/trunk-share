import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage } from '@/lib/types';
import { toast } from 'sonner';

const ChatSheet = () => {
  const { chatState, closeChat, getRoute, getShipment, createShipment, addMessageToShipment } = useApp();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [tempMessages, setTempMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isRouteMode = chatState.mode === 'route';
  const route = chatState.routeId ? getRoute(chatState.routeId) : undefined;
  const shipment = chatState.shipmentId ? getShipment(chatState.shipmentId) : undefined;
  const messages = isRouteMode ? tempMessages : (shipment?.messages || []);

  useEffect(() => {
    if (!chatState.isOpen) {
      setTempMessages([]);
      setInput('');
    }
  }, [chatState.isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const sendMessage = () => {
    if (!input.trim() || !user) return;
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      senderId: user.id,
      senderName: user.name,
      text: input.trim(),
      timestamp: Date.now(),
    };
    if (isRouteMode) {
      setTempMessages(prev => [...prev, msg]);
    } else if (shipment) {
      addMessageToShipment(shipment.id, msg);
    }
    setInput('');
  };

  const handleReserve = () => {
    if (!chatState.routeId) return;
    createShipment(chatState.routeId, tempMessages);
    toast.success('Zahtev za slanje je uspešno poslat!');
  };

  const title = isRouteMode
    ? `Razgovor sa ${route?.driverName || 'vozačem'}`
    : `${shipment?.from} → ${shipment?.to}`;

  return (
    <Drawer open={chatState.isOpen} onOpenChange={open => !open && closeChat()}>
      <DrawerContent className="h-[85vh] flex flex-col">
        <DrawerHeader className="border-b border-border pb-3">
          <DrawerTitle className="text-base">{title}</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">
              Započnite konverzaciju...
            </p>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.senderId === user?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {msg.senderId !== user?.id && (
                  <p className="text-xs font-medium mb-1 opacity-75">{msg.senderName}</p>
                )}
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {isRouteMode && (
          <div className="px-4 py-2 border-t border-border">
            <Button onClick={handleReserve} className="w-full">
              Rezerviši slanje
            </Button>
          </div>
        )}

        <div className="px-4 py-3 border-t border-border flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Napišite poruku..."
            className="flex-1"
          />
          <Button size="icon" onClick={sendMessage} disabled={!input.trim()}>
            <Send size={16} />
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatSheet;
