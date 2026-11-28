import type { Headquarters, UserSystem } from '@/types/systemTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HeadquarterStore {
    currentHeadquarter: Headquarters | null; // almacena la información completa de la sede seleccionada por el usuario
    setCurrentHeadquarter: (headquarters: Headquarters) => void;
    allHeadquarters: UserSystem['idHeadquarter'] | []; // guarda los ids de las sedes a las que pertenece el usuario
    setAllHeadquarters: (headquarters: UserSystem['idHeadquarter'] | []) => void;
    clearHeadquarter: () => void;
}

export const useHeadquarterStore = create<HeadquarterStore>()(
    persist(
        (set) => ({
            currentHeadquarter: null,
            setCurrentHeadquarter: (headquarter) => set({ currentHeadquarter: headquarter }),
            allHeadquarters: [],
            setAllHeadquarters: (headquarters) => set({ allHeadquarters: headquarters }),
            clearHeadquarter: () => set({ currentHeadquarter: null, allHeadquarters: [] }),
        }),
        { name: 'headquarters-store' },
    ),
);
