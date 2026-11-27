
import type { Headquarters } from "@/types/headquarters";

// FAKE DATA
import { mockHeadquarters } from "@/utils/fakeData";

export const HeadquartersActionService = {

    getHqsById: async (ids: string[]): Promise<Headquarters[]> => {
        try {
            if (!ids || ids.length == 0) {
                throw new Error('El/los ids de las sedes son necesarios')
            }


            const sedesFounded = mockHeadquarters.filter(hq => ids.some(id => id == hq.id));
            console.log(sedesFounded);

            if (sedesFounded.length == 0) throw new Error('No se encontraron sedes con el id')

            return sedesFounded;

        } catch (error) {
            console.error('getHqsById', error);
            throw error;
        }
    }
}