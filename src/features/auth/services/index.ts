import type { UserSystem } from "@/types/systemTypes";
import { authLoginData } from "../signin/schemas/authLoginSchema";
// FAKE DATA
import { mockStaff } from "@/utils/fakeData";

export const LoginActionService = {

    authLogin: async (data: authLoginData): Promise<UserSystem> => {

        const user = mockStaff.find(user => user.email === data.email);

        try {
            return {
                id: user?.id,
                idHeadquarter: user?.idHeadquarter,
                name: user?.name,
                lastName: user?.lastName,
                email: user?.email,
                role: user?.role,
                image: user?.image,
                status: user?.status,
            } as UserSystem;
        } catch (error) {
            console.error('AUTH-LOGIN ==>', error);
            throw error;
        }
    }

};