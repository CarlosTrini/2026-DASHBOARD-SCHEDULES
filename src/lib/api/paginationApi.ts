import type { ResponseDataPaginated } from "@/types/apiTypes";

interface PaginationOptions<T> {
    items: T[];
    page?: number;
    limit?: number;
}
export const makePagination = <T>({ items, page = 1, limit = 10 }: PaginationOptions<T>): ResponseDataPaginated<T> => {

    const allServices = items;
    const total = allServices.length;
    const totalPages = Math.ceil(total / limit);

    // como la datafake por ahora son un arreglo, se usa slice para paginarlo...
    // modificar al usar la base de datos
    const startIndex = (page - 1) * limit;
    const paginatedServices = allServices.slice(startIndex, (startIndex + limit)); //los servicios

    const paginationOptions = {
        allDocs: allServices,
        docs: paginatedServices,
        totalDocs: total,
        totalPages,
        page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        prevPage: page > 1 ? (page - 1) : null,
        nextPage: page < totalPages ? (page + 1) : null
    }

    return paginationOptions;
}