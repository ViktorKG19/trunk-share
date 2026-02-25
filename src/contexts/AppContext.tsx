import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TrunkRoute, Shipment, Review, ChatMessage, ShipmentStatus, User } from '@/lib/types';
import { DEMO_ROUTES, DEMO_REVIEWS, DEMO_USERS } from '@/lib/constants';
import { useAuth } from './AuthContext';

export type Tab = 'send' | 'publish' | 'status' | 'profile';

interface ChatState {
  isOpen: boolean;
  mode: 'route' | 'shipment';
  routeId?: string;
  shipmentId?: string;
}

interface AppContextType {
  routes: TrunkRoute[];
  shipments: Shipment[];
  reviews: Review[];
  demoUsers: User[];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  chatState: ChatState;
  profileUserId: string | null;
  setProfileUserId: (id: string | null) => void;
  addRoute: (route: Omit<TrunkRoute, 'id' | 'driverId' | 'driverName'>) => void;
  searchRoutes: (from: string, date: string) => TrunkRoute[];
  openRouteChat: (routeId: string) => void;
  openShipmentChat: (shipmentId: string) => void;
  closeChat: () => void;
  createShipment: (routeId: string, messages: ChatMessage[]) => void;
  updateShipmentStatus: (shipmentId: string, status: ShipmentStatus) => void;
  addMessageToShipment: (shipmentId: string, message: ChatMessage) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  markShipmentReviewed: (shipmentId: string) => void;
  getRoute: (routeId: string) => TrunkRoute | undefined;
  getShipment: (shipmentId: string) => Shipment | undefined;
  openUserProfile: (userId: string) => void;
  getDemoUser: (userId: string) => User | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [routes, setRoutes] = useState<TrunkRoute[]>(DEMO_ROUTES);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [reviews, setReviews] = useState<Review[]>(DEMO_REVIEWS);
  const [activeTab, setActiveTab] = useState<Tab>('send');
  const [chatState, setChatState] = useState<ChatState>({ isOpen: false, mode: 'route' });
  const [profileUserId, setProfileUserId] = useState<string | null>(null);
  const demoUsers = DEMO_USERS;

  const addRoute = (routeData: Omit<TrunkRoute, 'id' | 'driverId' | 'driverName'>) => {
    if (!user) return;
    const newRoute: TrunkRoute = {
      ...routeData,
      id: crypto.randomUUID(),
      driverId: user.id,
      driverName: user.name,
    };
    setRoutes(prev => [...prev, newRoute]);
  };

  const searchRoutes = (from: string, date: string): TrunkRoute[] => {
    return routes.filter(r => r.from === from && r.date === date && r.driverId !== user?.id && r.availableSlots > 0);
  };

  const openRouteChat = (routeId: string) => {
    setChatState({ isOpen: true, mode: 'route', routeId });
  };

  const openShipmentChat = (shipmentId: string) => {
    setChatState({ isOpen: true, mode: 'shipment', shipmentId });
  };

  const closeChat = () => {
    setChatState({ isOpen: false, mode: 'route' });
  };

  const createShipment = (routeId: string, messages: ChatMessage[]) => {
    if (!user) return;
    const route = routes.find(r => r.id === routeId);
    if (!route || route.availableSlots <= 0) return;

    // Decrement available slots
    setRoutes(prev => prev.map(r =>
      r.id === routeId ? { ...r, availableSlots: r.availableSlots - 1 } : r
    ));

    const shipment: Shipment = {
      id: crypto.randomUUID(),
      routeId,
      senderId: user.id,
      senderName: user.name,
      driverId: route.driverId,
      driverName: route.driverName,
      from: route.from,
      to: route.to,
      date: route.date,
      status: 'zahtev_poslat',
      messages,
    };
    setShipments(prev => [...prev, shipment]);
    setActiveTab('status');
    closeChat();
  };

  const updateShipmentStatus = (shipmentId: string, status: ShipmentStatus) => {
    setShipments(prev => prev.map(s => s.id === shipmentId ? { ...s, status } : s));
  };

  const addMessageToShipment = (shipmentId: string, message: ChatMessage) => {
    setShipments(prev => prev.map(s =>
      s.id === shipmentId ? { ...s, messages: [...s.messages, message] } : s
    ));
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const review: Review = {
      ...reviewData,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [...prev, review]);
  };

  const markShipmentReviewed = (shipmentId: string) => {
    setShipments(prev => prev.map(s => s.id === shipmentId ? { ...s, reviewed: true } : s));
  };

  const getRoute = (routeId: string) => routes.find(r => r.id === routeId);
  const getShipment = (shipmentId: string) => shipments.find(s => s.id === shipmentId);
  const getDemoUser = (userId: string) => demoUsers.find(u => u.id === userId);

  const openUserProfile = (userId: string) => {
    setProfileUserId(userId);
  };

  return (
    <AppContext.Provider value={{
      routes, shipments, reviews, demoUsers, activeTab, setActiveTab, chatState,
      profileUserId, setProfileUserId,
      addRoute, searchRoutes, openRouteChat, openShipmentChat, closeChat,
      createShipment, updateShipmentStatus, addMessageToShipment,
      addReview, markShipmentReviewed, getRoute, getShipment, openUserProfile, getDemoUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};
