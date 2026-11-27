import type { authLoginData } from "../signin/schemas/authLoginSchema";
// FAKE DATA
import { mockStaff } from "@/utils/fakeData";
import { UserSystem } from "@/types/systemTypes";

export const AuthActionService = {

    authLogin: async (data: authLoginData): Promise<UserSystem> => {

        try {
            const user = mockStaff.find(user => user.email.toLocaleLowerCase().trim() === data.email.toLocaleLowerCase().trim());

            // por mock se evalua solo el email, ya con back se evaluan haya
            if (!user) throw new Error('Credenciales inválidas.');

            // evaluar status cuando venga del back... y lanzar throw
            // evaluar que venga token del back.... lanzar throw si no...

            // status ok
            return {
                id: user?.id,
                token: 'soy-un-token-fake',
                idHeadquarter: user?.idHeadquarter,
                name: user?.name,
                lastName: user?.lastName,
                email: user?.email,
                role: user?.role,
                image: user?.image,
                status: user?.status,
            };
        } catch (error: unknown) {
            console.error('AUTH-LOGIN ==>', error);
            const message =
                error instanceof Error
                    ? error.message
                    : 'Error al autenticar';

            throw new Error(message);

            //     // PARA CON AXIOS
            //     console.error('AUTH-LOGIN ==>', error);

            //     let message = 'Error al autenticar';

            //     if (axios.isAxiosError(error)) {
            //         message = error.response?.data?.message || message;
            //     } else if (error instanceof Error) {
            //         message = error.message;
            //     }

            //     throw new Error(message);
            // }
        }
    }

};