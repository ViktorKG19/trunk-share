import { TrunkRoute, Review } from './types';

export const SERBIAN_CITIES = [
  "Beograd", "Novi Sad", "Niš", "Kragujevac", "Subotica",
  "Zrenjanin", "Pančevo", "Čačak", "Kraljevo", "Novi Pazar",
  "Smederevo", "Leskovac", "Užice", "Vranje", "Šabac",
  "Valjevo", "Kruševac", "Sombor", "Požarevac", "Pirot",
];

export const DEMO_ROUTES: TrunkRoute[] = [
  {
    id: 'demo-1', driverId: 'driver-1', driverName: 'Marko Petrović',
    from: 'Beograd', to: 'Novi Sad', date: '2026-03-01', time: '08:00', availableSlots: 3,
  },
  {
    id: 'demo-2', driverId: 'driver-2', driverName: 'Ana Jovanović',
    from: 'Niš', to: 'Beograd', date: '2026-03-02', time: '10:30', availableSlots: 2,
  },
  {
    id: 'demo-3', driverId: 'driver-3', driverName: 'Stefan Nikolić',
    from: 'Kragujevac', to: 'Čačak', date: '2026-03-03', time: '14:00', availableSlots: 1,
  },
  {
    id: 'demo-4', driverId: 'driver-1', driverName: 'Marko Petrović',
    from: 'Novi Sad', to: 'Subotica', date: '2026-03-05', time: '09:00', availableSlots: 4,
  },
  {
    id: 'demo-5', driverId: 'driver-4', driverName: 'Jelena Đorđević',
    from: 'Beograd', to: 'Niš', date: '2026-03-04', time: '07:00', availableSlots: 2,
  },
];

export const DEMO_REVIEWS: Review[] = [
  {
    id: 'rev-1', fromUserId: 'driver-1', fromUserName: 'Marko Petrović',
    toUserId: 'driver-2', toUserName: 'Ana Jovanović',
    rating: 5, comment: 'Odlična komunikacija i brza isporuka!', type: 'posiljalac', date: '2026-02-20',
  },
  {
    id: 'rev-2', fromUserId: 'driver-3', fromUserName: 'Stefan Nikolić',
    toUserId: 'driver-1', toUserName: 'Marko Petrović',
    rating: 4, comment: 'Pouzdan vozač, preporučujem.', type: 'vozac', date: '2026-02-18',
  },
  {
    id: 'rev-3', fromUserId: 'driver-4', fromUserName: 'Jelena Đorđević',
    toUserId: 'driver-3', toUserName: 'Stefan Nikolić',
    rating: 5, comment: 'Sve je stiglo u savršenom stanju. Hvala!', type: 'vozac', date: '2026-02-15',
  },
];
