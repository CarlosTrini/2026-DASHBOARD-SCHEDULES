
import type { Headquarters } from "@/types/headquarters";

// FAKE DATA
import { mockDelay, mockHeadquarters } from "@/utils/fakeData";

export const HeadquartersActionService = {

    getHqsById: async (idHq: string): Promise<Headquarters> => {
        try {

            await mockDelay();

            if (!idHq) {
                throw new Error('El id de la sede es necesario')
            }

            const sedeFounded = mockHeadquarters.find(hq => idHq == hq.id);

            if (!sedeFounded) throw new Error('No se encontro la sede con el id proporcionado')

            return sedeFounded;

        } catch (error) {
            console.error('getHqsById', error);
            throw error;
        }
    }
}