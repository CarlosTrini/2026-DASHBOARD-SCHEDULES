import { SignUpView } from "@/features/auth";

export const metadata = {
    title: "Registro para acceder al sistema - Administrador de citas",
    description: "Aqui puedes Registrarte y crear una cuenta dentro del sistema si es que aún no cuentas con una, y continuar con tu administración"

};

export default function SignUnPage() {
    return <SignUpView />
}