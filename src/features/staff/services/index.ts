// import { apiClient } from "@/lib/axios";
import { Staff } from "@/types/systemTypes";
import type { StaffMetrics } from "../types/index";

import { mockDelay, mockStaff } from "@/utils/fakeData";
import { makePagination } from "@/lib/api/paginationApi";
import { ResponseDataPaginated } from "@/types/apiTypes";



export const StaffActionService = {
    getAllStaff: async function (page: number = 1, limit: number = 10): Promise<ResponseDataPaginated<Staff>> {
        // data del personal que se ve en la data
        try {
            const data = makePagination<Staff>({
                items: mockStaff,
                page,
                limit
            })
            return data;
        } catch (error) {
            console.error('getAllStaff =>', error);
            throw error;
        }
    },

    getStaffMetrics: async function (): Promise<StaffMetrics> {
        // todo el personal
        try {
            // const res = await fetch('/api/staff');
            // if (!res.ok) throw new Error(`HTTP ${res.status}`);

            // const data: unknown = await res.json();    // unknown: no confiamos todavía
            // return z.array(StaffSchema).parse(data);   // valida y devuelve tipado
            await mockDelay;

            const totalStaff = mockStaff.length;
            const activeStaff = mockStaff.filter((p) => p.status === "active").length
            return {
                total: totalStaff,
                status: {
                    active: activeStaff,
                    inactive: mockStaff.filter((p) => p.status === "inactive").length,
                    leave: mockStaff.filter((p) => p.status === "vacation").length,
                    dayOff: mockStaff.filter((p) => p.status === "sick").length
                },
                staffActive: {
                    percentaje: totalStaff > 0 ? Math.round((activeStaff / totalStaff) * 100) : 0,
                },
            };
        } catch (error) {
            console.error('getStaffMetrics =>', error)
            throw error;
        }

    }
}

