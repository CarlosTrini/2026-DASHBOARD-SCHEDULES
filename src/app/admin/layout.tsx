// src/app/admin/layout.tsx
import { SidebarProvider } from "@/context/SidebarContext";
import DashboardLayout from "@/layout/DashboardLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DashboardLayout>

                {children}

            </DashboardLayout>
        </SidebarProvider>
    );
}