import { Package, MapPin, Truck, Star, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import SendPackage from '@/pages/SendPackage';
import PublishRoute from '@/pages/PublishRoute';
import ShipmentStatus from '@/pages/ShipmentStatus';
import Reviews from '@/pages/Reviews';
import ChatSheet from '@/components/ChatSheet';
import logo from '@/assets/logo.webp';

const tabs = [
  { id: 'send' as const, label: 'Pošalji', icon: Package },
  { id: 'publish' as const, label: 'Objavi', icon: MapPin },
  { id: 'status' as const, label: 'Status', icon: Truck },
  { id: 'reviews' as const, label: 'Recenzije', icon: Star },
];

const MainLayout = () => {
  const { activeTab, setActiveTab } = useApp();
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <img src={logo} alt="TrunkShare" className="h-8" />
          <span className="font-bold text-foreground text-lg">TrunkShare</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">{user?.name}</span>
          <button onClick={logout} className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'send' && <SendPackage />}
        {activeTab === 'publish' && <PublishRoute />}
        {activeTab === 'status' && <ShipmentStatus />}
        {activeTab === 'reviews' && <Reviews />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex z-20">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center py-3 gap-1 text-xs font-medium transition-colors ${
              activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
          </button>
        ))}
      </nav>

      <ChatSheet />
    </div>
  );
};

export default MainLayout;
