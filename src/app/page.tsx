// src/app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
    // Cuando alguien entra a "/" lo mandas al login o al dashboard admin:
    redirect("/admin"); // o redirect("/login/signin")
}