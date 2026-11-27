import { UserSystem } from "./systemTypes";

export interface ResponseDataPaginated<T> {
    allDocs?: T[]; // todos los items si son necesarios
    docs: T[]; // los referentes a la paginación
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}


// // FORMA DE RESPUESTA DEL BACKEND (POR AHORA YA NO NECESARIA)
// // Envoltorio genérico para cualquier respuesta del backend:
// export interface ApiResponse<T> {
//     message: string;
//     status: number; // 👈 200, 201, 400 (Status HTTP de la red)
//     data: T;
// }

// // Para el login ( token + datos del usuario):
// export interface AuthLoginResponse {
//     message: string;
//     status: number; // Código HTTP (200)
//     token?: string; // Token JWT para la cookie
//     data: UserSystem; // 👈 Aquí dentro vive el usuario con su propio status: "active"
// }