// src/app/admin/layout.tsx
import { SidebarProvider } from "@/context/SidebarContext";
import DashboardLayout from "@/layout/DashboardLayout";
import { Suspense } from "react";
import Loading from "../loading";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardLayout>
                <Suspense fallback={<Loading />} >
                    {children}
                </Suspense>
            </DashboardLayout>
        </SidebarProvider>
    );
}