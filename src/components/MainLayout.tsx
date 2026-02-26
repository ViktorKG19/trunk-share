import { Package, MapPin, Truck, UserCircle, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import SendPackage from '@/pages/SendPackage';
import PublishRoute from '@/pages/PublishRoute';
import ShipmentStatus from '@/pages/ShipmentStatus';
import UserProfile from '@/pages/UserProfile';
import ChatSheet from '@/components/ChatSheet';
import logo from '@/assets/logo.webp';

const tabs = [
  { id: 'send' as const, label: 'Pošalji', icon: Package },
  { id: 'publish' as const, label: 'Objavi', icon: MapPin },
  { id: 'status' as const, label: 'Status', icon: Truck },
  { id: 'profile' as const, label: 'Profil', icon: UserCircle },
];

const MainLayout = () => {
  const { activeTab, setActiveTab, profileUserId, setProfileUserId } = useApp();
  const { logout, user } = useAuth();

  const currentTab = profileUserId ? 'viewing-profile' : activeTab;

  const renderContent = () => {
    if (profileUserId) {
      return <UserProfile userId={profileUserId} />;
    }
    switch (activeTab) {
      case 'send': return <SendPackage />;
      case 'publish': return <PublishRoute />;
      case 'status': return <ShipmentStatus />;
      case 'profile': return <UserProfile userId={user!.id} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center -ml-2">
          <img src={logo} alt="TrunkShare" className="h-[120px] object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">{user?.name}</span>
          <button onClick={logout} className="text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex z-20">
        {tabs.map(tab => {
          const isActive = (!profileUserId && activeTab === tab.id) || (profileUserId && tab.id === 'profile');
          return (
            <button
              key={tab.id}
              onClick={() => { setProfileUserId(tab.id === 'profile' ? null : null); setActiveTab(tab.id); }}
              className={`flex-1 flex flex-col items-center py-3 gap-1 text-xs font-medium transition-all duration-200 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <tab.icon size={20} className="transition-transform duration-200" style={isActive ? { transform: 'scale(1.1)' } : {}} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <ChatSheet />
    </div>
  );
};

export default MainLayout;
