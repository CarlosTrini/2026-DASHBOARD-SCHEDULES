import { authLoginData } from "@/features/auth/signin/schemas/authLoginSchema";

// systemTypes.ts
export type Days = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type StatusSchedule = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rescheduled';
export type RoleSystem = "admin" | "receptionist";
export type StatusStaff = "active" | "inactive" | "vacation" | "sick" | "leave" | "dayOff";
export type StatusDay = 'open' | 'closed' | 'half-day';

// Bloque horario (tabla availability_slots)
export interface TimeSlot {
    id: string;
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
    isAvailable: boolean; // false = bloque cerrado
}

// Horario de un día para una sede (tabla availability)
export interface AvailabilityTime {
    id: string;
    idHeadquarter: string;
    dayOfWeek: Days;
    status: StatusDay;
    timeSlots: TimeSlot[];
}

// Vista agregada de los 7 días de una sede. No es tabla: se arma con availability + availability_slots
export interface AvailabilitySchedule {
    idHeadquarter: string;
    monday: AvailabilityTime;
    tuesday: AvailabilityTime;
    wednesday: AvailabilityTime;
    thursday: AvailabilityTime;
    friday: AvailabilityTime;
    saturday: AvailabilityTime;
    sunday: AvailabilityTime;
}

// Usuario del sistema. No tiene tabla en la base de datos (ver pendientes de la documentación) se genera de data del staff...
export interface UserSystem {
    id: string;
    idHeadquarter: string;
    name: string;
    lastName?: string;
    email: string;
    role: RoleSystem;
    image?: string;
    status: StatusStaff;
}

// Personal (tabla staff). Un solo rol y un solo estatus a la vez
export interface Staff {
    id: string;
    idHeadquarter: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: RoleSystem;
    jobPosition: string;
    image?: string;
    status: StatusStaff;
    phone?: string;
    emergencyContact?: string;
    street: string;
    city: string;
    state?: string;
    zipCode?: string;
    country?: string;
    createdAt: string;

}

// Relación personal-sede (tabla staff_headquarters)
// export interface StaffHeadquarters {
//     idStaff: string;
//     idHeadquarter: string;
// }

// Servicios (tabla services)
export interface Service {
    id: string;
    name: string;
    description?: string;
    price: number;
    discount: number | null; // 0 a 100, en porcentaje. null = sin descuento
    durationMinutes: number;
    image?: string;
    available: boolean;
}

// Relación servicio-sede (tabla headquarters_services)
export interface HeadquartersService {
    idHeadquarter: string;
    idService: string;
}

// Clientes (tabla clients)
export interface Client {
    id: string;
    idHeadquarter: string;
    name: string;
    lastName: string;
    userName: string;
    email: string;
    image?: string;
    createdAt: string;
}

// Citas (tabla schedules)
export interface Schedule {
    id: string;
    idHeadquarter: string;
    idClient: string;
    idService: string;
    status: StatusSchedule;
    startAt: string; // ISO 8601
    endAt: string;   // ISO 8601
    notes?: string;
    createdAt: string;
}



// LOGIN - REGISTER
// authLoginData; esta interface se crea en zod viene del schema de signin...
// authRegisterData; esta interface se crea en zod viene del schema de signup...