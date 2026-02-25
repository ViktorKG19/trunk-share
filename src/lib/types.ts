export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  city: string;
  bio: string;
}

export interface TrunkRoute {
  id: string;
  driverId: string;
  driverName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  availableSlots: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
}

export type ShipmentStatus = 'zahtev_poslat' | 'prihvaceno' | 'u_toku' | 'isporuceno';

export interface Shipment {
  id: string;
  routeId: string;
  senderId: string;
  senderName: string;
  driverId: string;
  driverName: string;
  from: string;
  to: string;
  date: string;
  status: ShipmentStatus;
  messages: ChatMessage[];
  reviewed?: boolean;
}

export interface Review {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  rating: number;
  comment: string;
  type: 'vozac' | 'posiljalac';
  date: string;
}
