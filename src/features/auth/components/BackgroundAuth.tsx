"use client";
import Image from "next/image";


interface Props {
    children: React.ReactNode;

}

const BackgroundAuth = ({ children }: Props) => {




    return (
        <section className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* IMAGEN FULL DE FONDO */}
            <Image
                src="/images/auth.png"
                alt="Fondo de autenticación"
                fill
                priority
                className="object-cover object-center"
            />

            {/* CAPA NEGRA CON OPACIDAD Y BLUR CINEMÁTICO */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px] dark:bg-black/75" />

            {/* TARJETA CENTRADA CON ESTILO GLASSMORPHISM */}
            <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl backdrop-blur-lg ring-1 ring-inset ring-white/10 dark:border-white/50 bg-black/60 dark:shadow-black/70">
                {children}
            </div>
        </section>
    );
}

export default BackgroundAuth;