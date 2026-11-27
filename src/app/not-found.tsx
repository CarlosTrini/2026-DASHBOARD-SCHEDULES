"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import { ArrowLeftCircle } from "lucide-react";

export default function NotFound() {

  const router = useRouter();

  return (
    <div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 bg-black-light">


      <div className="mx-auto w-full max-w-70.5 text-center sm:max-w-150">
        <h1 className="italic mb-8 text-title-md font-bold text-gray-dark xl:text-title-2xl dark:text-light-accent/90">
          ¡Upss!
        </h1>
        <p className="my-10 mb-6 text-gray-dark sm:text-lg dark:text-gray-light text-center italic">
          Lo sentimos <br /> La página que estás buscando no existe o fue movida.
        </p>

        <Image
          src="/images/not-found.png"
          alt="404"
          className="mx-auto rounded-2xl mb-5"
          width={550}
          height={180}
          loading="eager"
        />




        <Button
          startIcon={<ArrowLeftCircle />}
          onClick={() => router.back()}
          variant="outline"
          typeButton="primary"
          size="md"
        // className="inline-flex items-center justify-center rounded-lg border border-gray-light bg-light-accent px-5 py-3.5 text-sm font-medium text-gray-dark shadow-theme-xs hover:bg-light hover:text-gray-dark dark:border-gray-dark dark:bg-gray-dark dark:text-gray-light dark:hover:bg-light-accent/3 dark:hover:text-gray-light"
        >
          Regresar
        </Button>
      </div>
    </div>
  );
}
