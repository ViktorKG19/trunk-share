import { TrunkRoute, Review, User } from './types';

export const SERBIAN_CITIES = [
  "Beograd", "Novi Sad", "Niš", "Kragujevac", "Subotica",
  "Zrenjanin", "Pančevo", "Čačak", "Kraljevo", "Novi Pazar",
  "Smederevo", "Leskovac", "Užice", "Vranje", "Šabac",
  "Valjevo", "Kruševac", "Sombor", "Požarevac", "Pirot",
];

export const DEMO_USERS: User[] = [
  {
    id: 'driver-1', name: 'Marko Petrović', email: 'marko@email.com', age: 32, city: 'Beograd',
    bio: 'Putujem redovno između Beograda i Novog Sada. Pouzdan i tačan vozač sa 3 godine iskustva na platformi.',
    verified: true, deliveryCount: 87, avgResponseTime: '3 min',
  },
  {
    id: 'driver-2', name: 'Ana Jovanović', email: 'ana@email.com', age: 28, city: 'Niš',
    bio: 'Studentkinja koja često putuje. Uvek imam mesta u gepeku za vaše pakete!',
    verified: true, deliveryCount: 42, avgResponseTime: '5 min',
  },
  {
    id: 'driver-3', name: 'Stefan Nikolić', email: 'stefan@email.com', age: 35, city: 'Kragujevac',
    bio: 'Profesionalni vozač, putujem kroz celu Srbiju. Bezbedna i brza dostava garantovana.',
    verified: true, deliveryCount: 124, avgResponseTime: '2 min',
  },
  {
    id: 'driver-4', name: 'Jelena Đorđević', email: 'jelena@email.com', age: 26, city: 'Novi Sad',
    bio: 'Volim da pomognem ljudima da pošalju svoje pakete. Uvek nasmejana i komunikativna!',
    verified: false, deliveryCount: 31, avgResponseTime: '8 min',
  },
  {
    id: 'driver-5', name: 'Nikola Stojanović', email: 'nikola@email.com', age: 41, city: 'Subotica',
    bio: 'Iskusan vozač sa čistim dosadašnjim ocenama. Vaši paketi su u sigurnim rukama.',
    verified: true, deliveryCount: 203, avgResponseTime: '4 min',
  },
  {
    id: 'driver-6', name: 'Milica Ilić', email: 'milica@email.com', age: 30, city: 'Čačak',
    bio: 'Redovno putujem na relaciji Čačak–Beograd i rado prenosim pakete.',
    verified: true, deliveryCount: 56, avgResponseTime: '6 min',
  },
  {
    id: 'driver-7', name: 'Đorđe Milanović', email: 'djordje@email.com', age: 38, city: 'Kraljevo',
    bio: 'Preduzimač koji putuje širom Srbije. Koristim TrunkShare od prvog dana.',
    verified: true, deliveryCount: 178, avgResponseTime: '3 min',
  },
  {
    id: 'driver-8', name: 'Ivana Popović', email: 'ivana@email.com', age: 24, city: 'Zrenjanin',
    bio: 'Nova na platformi ali veoma posvećena! Svaki paket tretiram kao da je moj.',
    verified: false, deliveryCount: 12, avgResponseTime: '10 min',
  },
  {
    id: 'driver-9', name: 'Aleksandar Pavlović', email: 'aleksandar@email.com', age: 45, city: 'Valjevo',
    bio: 'Kamionski vozač u penziji. Sada uživam da pomažem ljudima sa manjim paketima.',
    verified: true, deliveryCount: 95, avgResponseTime: '7 min',
  },
  {
    id: 'driver-10', name: 'Tamara Milošević', email: 'tamara@email.com', age: 29, city: 'Užice',
    bio: 'Marketing menadžerka koja putuje skoro svaki dan. Uvek imam mesta za paket ili dva.',
    verified: true, deliveryCount: 67, avgResponseTime: '4 min',
  },
];

export const DEMO_ROUTES: TrunkRoute[] = [
  // Mart 1
  { id: 'demo-1', driverId: 'driver-1', driverName: 'Marko Petrović', driverVerified: true, from: 'Beograd', to: 'Novi Sad', date: '2026-03-01', time: '08:00', availableSlots: 3 },
  { id: 'demo-6', driverId: 'driver-5', driverName: 'Nikola Stojanović', driverVerified: true, from: 'Subotica', to: 'Beograd', date: '2026-03-01', time: '06:30', availableSlots: 5 },
  { id: 'demo-10', driverId: 'driver-9', driverName: 'Aleksandar Pavlović', driverVerified: true, from: 'Valjevo', to: 'Beograd', date: '2026-03-01', time: '08:00', availableSlots: 3 },
  { id: 'demo-14', driverId: 'driver-7', driverName: 'Đorđe Milanović', driverVerified: true, from: 'Beograd', to: 'Kraljevo', date: '2026-03-01', time: '16:00', availableSlots: 2 },
  // Mart 2
  { id: 'demo-2', driverId: 'driver-2', driverName: 'Ana Jovanović', driverVerified: true, from: 'Niš', to: 'Beograd', date: '2026-03-02', time: '10:30', availableSlots: 2 },
  { id: 'demo-7', driverId: 'driver-6', driverName: 'Milica Ilić', driverVerified: true, from: 'Čačak', to: 'Beograd', date: '2026-03-02', time: '07:00', availableSlots: 2 },
  { id: 'demo-11', driverId: 'driver-10', driverName: 'Tamara Milošević', driverVerified: true, from: 'Užice', to: 'Beograd', date: '2026-03-02', time: '06:00', availableSlots: 2 },
  { id: 'demo-19', driverId: 'driver-1', driverName: 'Marko Petrović', driverVerified: true, from: 'Beograd', to: 'Zrenjanin', date: '2026-03-02', time: '09:00', availableSlots: 4 },
  // Mart 3
  { id: 'demo-3', driverId: 'driver-3', driverName: 'Stefan Nikolić', driverVerified: true, from: 'Kragujevac', to: 'Čačak', date: '2026-03-03', time: '14:00', availableSlots: 1 },
  { id: 'demo-8', driverId: 'driver-7', driverName: 'Đorđe Milanović', driverVerified: true, from: 'Kraljevo', to: 'Niš', date: '2026-03-03', time: '11:00', availableSlots: 3 },
  { id: 'demo-12', driverId: 'driver-8', driverName: 'Ivana Popović', from: 'Zrenjanin', to: 'Novi Sad', date: '2026-03-03', time: '15:00', availableSlots: 1 },
  { id: 'demo-18', driverId: 'driver-4', driverName: 'Jelena Đorđević', from: 'Novi Sad', to: 'Beograd', date: '2026-03-03', time: '10:00', availableSlots: 3 },
  { id: 'demo-20', driverId: 'driver-5', driverName: 'Nikola Stojanović', driverVerified: true, from: 'Beograd', to: 'Niš', date: '2026-03-03', time: '07:30', availableSlots: 4 },
  // Mart 4
  { id: 'demo-5', driverId: 'driver-4', driverName: 'Jelena Đorđević', from: 'Beograd', to: 'Niš', date: '2026-03-04', time: '07:00', availableSlots: 2 },
  { id: 'demo-9', driverId: 'driver-3', driverName: 'Stefan Nikolić', driverVerified: true, from: 'Beograd', to: 'Kragujevac', date: '2026-03-04', time: '09:30', availableSlots: 2 },
  { id: 'demo-16', driverId: 'driver-6', driverName: 'Milica Ilić', driverVerified: true, from: 'Beograd', to: 'Čačak', date: '2026-03-04', time: '13:00', availableSlots: 2 },
  { id: 'demo-17', driverId: 'driver-1', driverName: 'Marko Petrović', driverVerified: true, from: 'Beograd', to: 'Novi Sad', date: '2026-03-04', time: '17:00', availableSlots: 2 },
  { id: 'demo-21', driverId: 'driver-9', driverName: 'Aleksandar Pavlović', driverVerified: true, from: 'Beograd', to: 'Valjevo', date: '2026-03-04', time: '11:00', availableSlots: 3 },
  // Mart 5
  { id: 'demo-4', driverId: 'driver-1', driverName: 'Marko Petrović', driverVerified: true, from: 'Novi Sad', to: 'Subotica', date: '2026-03-05', time: '09:00', availableSlots: 4 },
  { id: 'demo-13', driverId: 'driver-5', driverName: 'Nikola Stojanović', driverVerified: true, from: 'Beograd', to: 'Subotica', date: '2026-03-05', time: '12:00', availableSlots: 3 },
  { id: 'demo-15', driverId: 'driver-2', driverName: 'Ana Jovanović', driverVerified: true, from: 'Beograd', to: 'Niš', date: '2026-03-05', time: '08:30', availableSlots: 3 },
  { id: 'demo-22', driverId: 'driver-10', driverName: 'Tamara Milošević', driverVerified: true, from: 'Beograd', to: 'Užice', date: '2026-03-05', time: '14:00', availableSlots: 2 },
  { id: 'demo-23', driverId: 'driver-7', driverName: 'Đorđe Milanović', driverVerified: true, from: 'Niš', to: 'Kragujevac', date: '2026-03-05', time: '10:00', availableSlots: 3 },
  // Mart 6-8 (dodatni)
  { id: 'demo-24', driverId: 'driver-3', driverName: 'Stefan Nikolić', driverVerified: true, from: 'Beograd', to: 'Niš', date: '2026-03-06', time: '06:00', availableSlots: 3 },
  { id: 'demo-25', driverId: 'driver-6', driverName: 'Milica Ilić', driverVerified: true, from: 'Čačak', to: 'Kraljevo', date: '2026-03-06', time: '09:00', availableSlots: 2 },
  { id: 'demo-26', driverId: 'driver-8', driverName: 'Ivana Popović', from: 'Beograd', to: 'Zrenjanin', date: '2026-03-07', time: '08:00', availableSlots: 2 },
  { id: 'demo-27', driverId: 'driver-2', driverName: 'Ana Jovanović', driverVerified: true, from: 'Beograd', to: 'Kragujevac', date: '2026-03-07', time: '11:30', availableSlots: 3 },
  { id: 'demo-28', driverId: 'driver-1', driverName: 'Marko Petrović', driverVerified: true, from: 'Beograd', to: 'Novi Sad', date: '2026-03-08', time: '07:00', availableSlots: 5 },
  { id: 'demo-29', driverId: 'driver-5', driverName: 'Nikola Stojanović', driverVerified: true, from: 'Subotica', to: 'Novi Sad', date: '2026-03-08', time: '15:00', availableSlots: 2 },
];

export const DEMO_REVIEWS: Review[] = [
  { id: 'rev-1', fromUserId: 'driver-1', fromUserName: 'Marko Petrović', toUserId: 'driver-2', toUserName: 'Ana Jovanović', rating: 5, comment: 'Odlična komunikacija i brza isporuka! Paket stigao u savršenom stanju.', type: 'posiljalac', date: '2026-02-20' },
  { id: 'rev-2', fromUserId: 'driver-3', fromUserName: 'Stefan Nikolić', toUserId: 'driver-1', toUserName: 'Marko Petrović', rating: 5, comment: 'Pouzdan vozač, preporučujem svima. Uvek tačan i ljubazan.', type: 'vozac', date: '2026-02-18' },
  { id: 'rev-3', fromUserId: 'driver-4', fromUserName: 'Jelena Đorđević', toUserId: 'driver-3', toUserName: 'Stefan Nikolić', rating: 5, comment: 'Sve je stiglo u savršenom stanju. Hvala puno!', type: 'vozac', date: '2026-02-15' },
  { id: 'rev-4', fromUserId: 'driver-2', fromUserName: 'Ana Jovanović', toUserId: 'driver-1', toUserName: 'Marko Petrović', rating: 4, comment: 'Sve je bilo u redu, samo malo kašnjenja ali paket je bio bezbedan.', type: 'vozac', date: '2026-02-12' },
  { id: 'rev-5', fromUserId: 'driver-5', fromUserName: 'Nikola Stojanović', toUserId: 'driver-3', toUserName: 'Stefan Nikolić', rating: 5, comment: 'Profesionalan pristup, kao da šaljete kurirskom službom. Top!', type: 'vozac', date: '2026-02-10' },
  { id: 'rev-6', fromUserId: 'driver-1', fromUserName: 'Marko Petrović', toUserId: 'driver-5', toUserName: 'Nikola Stojanović', rating: 5, comment: 'Brz, efikasan, odgovoran. Sve pohvale za Nikolu!', type: 'vozac', date: '2026-02-08' },
  { id: 'rev-7', fromUserId: 'driver-6', fromUserName: 'Milica Ilić', toUserId: 'driver-7', toUserName: 'Đorđe Milanović', rating: 5, comment: 'Neverovatno brza dostava. Paket je stigao istog dana!', type: 'vozac', date: '2026-02-05' },
  { id: 'rev-8', fromUserId: 'driver-7', fromUserName: 'Đorđe Milanović', toUserId: 'driver-6', toUserName: 'Milica Ilić', rating: 4, comment: 'Prijatna osoba, lako smo se dogovorili oko detalja.', type: 'posiljalac', date: '2026-02-03' },
  { id: 'rev-9', fromUserId: 'driver-8', fromUserName: 'Ivana Popović', toUserId: 'driver-5', toUserName: 'Nikola Stojanović', rating: 5, comment: 'Iskusan vozač, paket zapakovan bolje nego što sam ja poslala!', type: 'vozac', date: '2026-01-28' },
  { id: 'rev-10', fromUserId: 'driver-9', fromUserName: 'Aleksandar Pavlović', toUserId: 'driver-1', toUserName: 'Marko Petrović', rating: 5, comment: 'Marko je uvek spreman da pomogne. Odlična usluga.', type: 'vozac', date: '2026-01-25' },
  { id: 'rev-11', fromUserId: 'driver-10', fromUserName: 'Tamara Milošević', toUserId: 'driver-2', toUserName: 'Ana Jovanović', rating: 4, comment: 'Sve je proteklo kako treba. Komunikacija na visokom nivou.', type: 'posiljalac', date: '2026-01-22' },
  { id: 'rev-12', fromUserId: 'driver-3', fromUserName: 'Stefan Nikolić', toUserId: 'driver-7', toUserName: 'Đorđe Milanović', rating: 5, comment: 'Đorđe je pravi profesionalac. Preporučujem bez rezerve.', type: 'vozac', date: '2026-01-20' },
  { id: 'rev-13', fromUserId: 'driver-5', fromUserName: 'Nikola Stojanović', toUserId: 'driver-9', toUserName: 'Aleksandar Pavlović', rating: 5, comment: 'Iskustvo se vidi! Paket je bio na destinaciji pre vremena.', type: 'vozac', date: '2026-01-18' },
  { id: 'rev-14', fromUserId: 'driver-4', fromUserName: 'Jelena Đorđević', toUserId: 'driver-10', toUserName: 'Tamara Milošević', rating: 5, comment: 'Tamara je super! Komunikativna i pouzdana.', type: 'vozac', date: '2026-01-15' },
  { id: 'rev-15', fromUserId: 'driver-2', fromUserName: 'Ana Jovanović', toUserId: 'driver-6', toUserName: 'Milica Ilić', rating: 4, comment: 'Dobra saradnja, sve je prošlo bez problema.', type: 'posiljalac', date: '2026-01-12' },
  { id: 'rev-16', fromUserId: 'driver-1', fromUserName: 'Marko Petrović', toUserId: 'driver-4', toUserName: 'Jelena Đorđević', rating: 4, comment: 'Jelena je prijatna osoba, slanje je bilo lako i brzo.', type: 'posiljalac', date: '2026-01-10' },
  { id: 'rev-17', fromUserId: 'driver-7', fromUserName: 'Đorđe Milanović', toUserId: 'driver-5', toUserName: 'Nikola Stojanović', rating: 5, comment: 'Nikola je kralj dostave! Apsolutno savršeno iskustvo.', type: 'vozac', date: '2026-01-08' },
  { id: 'rev-18', fromUserId: 'driver-9', fromUserName: 'Aleksandar Pavlović', toUserId: 'driver-3', toUserName: 'Stefan Nikolić', rating: 5, comment: 'Stefan je pouzdaniji od kurirske službe. Svaka čast!', type: 'vozac', date: '2026-01-05' },
  { id: 'rev-19', fromUserId: 'driver-10', fromUserName: 'Tamara Milošević', toUserId: 'driver-7', toUserName: 'Đorđe Milanović', rating: 5, comment: 'Prebrza dostava i odlična komunikacija. Vrh!', type: 'vozac', date: '2026-01-03' },
  { id: 'rev-20', fromUserId: 'driver-6', fromUserName: 'Milica Ilić', toUserId: 'driver-1', toUserName: 'Marko Petrović', rating: 5, comment: 'Marko je uvek tačan i pouzdan. Definitivno ponovo!', type: 'vozac', date: '2026-01-01' },
];
