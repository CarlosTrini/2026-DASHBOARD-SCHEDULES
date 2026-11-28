"use client";

//HOOKS
import { useEffect, useState } from "react";
//COMPONENTS
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TopAuth from "../components/TopAuth";

// SCHEMA
import { authLoginSchema, authLoginData, authLoginDefaultValues } from './schemas/authLoginSchema';

// NAVIGATION
import { useRouter } from 'next/navigation';


// ICONS
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Loader } from "lucide-react";

// LIBRARIES
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";

// TYPES
import type { UserSystem } from "@/types/systemTypes";


// STORES
import { useUserStore } from "@/store/useUserStore";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";

//SERVICES
import { AuthActionService } from "../services/index";
import Link from "next/link";
import { ROUTES_LINKS } from "@/utils/constants";
import BackgroundAuth from "../components/BackgroundAuth";
import Alert from "@/components/ui/alert/Alert";
import { saveCookieToken } from "@/utils/cookieActionsToken";
import { HeadquartersActionService } from "@/features/headquarters/services";




export default function SignInView() {


    // ROUTER - STATES--
    const [showPassword, setShowPassword] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const Navigate = useRouter();

    // ZUSTAND
    const { setToken, setUserInfo, setIsAuthenticated, setUserRole } = useUserStore();
    const { setCurrentHeadquarter, setAllHeadquarters, allHeadquarters } = useHeadquarterStore();


    // HOOK-FORM
    const { register, reset, formState: { errors }, handleSubmit } = useForm<authLoginData>({
        resolver: zodResolver(authLoginSchema),
        defaultValues: authLoginDefaultValues
    });



    // MUTATE PARA HEADEQUARTERS
    // TRAER LA DATA DE LA SEDE A LA QUE PERTENECE EL USUARIO (CON UNA SEDE)
    const { mutate: handleQuarters } = useMutation({
        mutationKey: ['headquarter-by-id'],
        mutationFn: (id: string) => HeadquartersActionService.getHqsById(id),
        onSuccess: (res) => {
            setCurrentHeadquarter(res);
            Navigate.push(ROUTES_LINKS.admin_route);
        },
        onError: (err) => {
            console.error('Error al obtener la sede');
        }
    });


    // const queryClient = useQueryClient();
    // MUTAT PARA USUARIO LOGUEADO
    const { mutate: handleLogin, isPending, isError, error } = useMutation({
        mutationKey: ['login-form'],
        mutationFn: (data: authLoginData) => AuthActionService.authLogin(data),
        onSuccess: (res) => {
            const dataUser = res;
            console.log(dataUser)

            if (dataUser) {
                saveCookieToken(dataUser.token);


                setToken(dataUser.token);
                setUserInfo(dataUser);
                setIsAuthenticated(true);
                reset();
                // Navigate.push('/admin');

                // // revisar a cuantás sedes pertenece este persona
                if (dataUser.idHeadquarter.length >= 2) {
                    // TOOD: SE VA A MOSTRAR UN OVERLAY EN EL QUE SELECCIONÉ LA SEDE QUE VA A USAR PARA INICIAR SESIÓN
                    setAllHeadquarters(dataUser.idHeadquarter); // son ids... o id...
                    Navigate.push(ROUTES_LINKS.overlay_route);
                } else {
                    handleQuarters(dataUser.idHeadquarter[0]);
                }
            }
        },
        onError: (err: any) => {
            console.log(err)

        }
    });



    const handleLoginSubmit = (data: authLoginData) => {
        // PASO 1: AL HACER LOGIN, LOGUEAR Y LLENAR STORE
        handleLogin(data);
    };


    // =================================================================
    // =================================================================
    // =================================================================
    // =================================================================
    // =================================================================
    // =================================================================
    // =================================================================
    // =================================================================

    return (
        <>
            <BackgroundAuth>
                <TopAuth
                    breadcrumbText='Portal de citas'
                    pageTitle='Iniciar Sesión'
                    subtitle='Ingresa tus credenciales para acceder a la plataforma.'
                />

                {/* Formulario */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(handleLoginSubmit)(e);
                    }}
                    noValidate
                    className="space-y-5"
                >
                    <div>
                        <Label htmlFor="email" className="italic system-text-theme-light!">
                            Correo Electrónico <span className="text-error">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@example.com"
                            size="md"
                            {...register('email')}
                            error={!!errors.email}
                            className="bg-black-light! system-text-theme-light! placeholder:text-light-accent/50"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" className="italic system-text-theme-light!">
                            Contraseña <span className="text-error">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                size="md"
                                {...register('password')}
                                error={!!errors.password}
                                className="bg-black-light! system-text-theme-light! placeholder:text-light-accent/50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray transition-colors hover:text-gray-dark dark:text-gray-light dark:hover:text-light cursor-pointer"
                                tabIndex={-1}
                                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                            >
                                {showPassword ? (
                                    <EyeIcon className="text-brand h-5 w-5" />
                                ) : (
                                    <EyeClosedIcon className="text-brand h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                {...register('rememberMe')}
                                error={!!errors.rememberMe}
                            />
                            <label
                                htmlFor="remember"
                                className="cursor-pointer text-sm text-theme-light-gray select-none system-text-theme-light-gray"
                            >
                                Recordar sesión
                            </label>
                        </div>
                        <Link
                            href="/reset-password"
                            className="text-sm font-medium text-brand transition-colors hover:text-brand-dark dark:text-brand-light dark:hover:text-brand"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    <div>
                        <Button disabled={isPending} type="submit" size="md" className="w-full justify-center mb-3">
                            {
                                isPending
                                    ? (
                                        <span className="flex gap-2 items-center">
                                            <Loader className="w-7 h-7 text-white animate-[spin_2s_linear_infinite]" /> Iniciando sesión
                                        </span>
                                    )
                                    : (
                                        <span>Iniciar sesión</span>
                                    )
                            }
                        </Button>
                    </div>
                </form>

                {/* Redirección a Registro */}
                <div className="mt-8 text-center sm:text-start">
                    <p className="text-sm system-text-theme-light">
                        ¿No tienes una cuenta?{" "}
                        <Link
                            href={ROUTES_LINKS.signup_route}
                            className="font-semibold text-brand transition-colors hover:text-brand-dark dark:text-brand-light dark:hover:text-brand"
                        >
                            Registrarse
                        </Link>
                    </p>
                </div>

            </BackgroundAuth>
            {/* ALERTS */}
            {
                isError && (
                    <Alert title={error?.message} variant="error" timer={2000} position="top-center" />
                )
            }
        </>
    );
}
