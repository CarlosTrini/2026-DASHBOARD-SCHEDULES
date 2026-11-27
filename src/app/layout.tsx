import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import TankStackProvider from "@/context/tankStackContext";
import DashboardLayout from "@/layout/DashboardLayout";
import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Dashboard",
    default: "Admin Dashboard",
  },
  description: "Plantilla de Dashboard con Next.js y Tailwind CSS",
  icons: {
    icon: "/favicon.ico",
  },
};

// Script inline para prevenir el flash de tema (FOUC) antes de la primera pintura del DOM
const themeInitializerScript = `
  (function() {
    try {
      var savedMode = localStorage.getItem('theme-mode') || localStorage.getItem('theme');
      var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = savedMode === 'dark' || ((!savedMode || savedMode === 'auto') && systemPrefersDark);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-color-scheme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-color-scheme', 'light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializerScript }}
        />
      </head>
      <body className="font-outfit antialiased dark:bg-gray-dark">
        <TankStackProvider>
          <ThemeProvider>
            {/* <SidebarProvider> se comentan ya que se llevan a admin para que este layout solo sea visible en el dashboard del admin
              <DashboardLayout> */}
            {/* <Suspense fallback={<Loading />} > */}
            {children}
            {/* </Suspense> */}
            {/* </DashboardLayout>
            </SidebarProvider> */}
          </ThemeProvider>
        </TankStackProvider>
      </body>
    </html>
  );
}
