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
