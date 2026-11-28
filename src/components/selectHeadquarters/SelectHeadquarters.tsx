// HOOKS
// NEXT


// TANSTACK QUERY
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ZUSTAND
import { useHeadquarterStore } from "@/store/useHeadquarterStore";

// SERVICIOS
import { HeadquartersActionService } from "@/features/headquarters/services";
import Select from "../form/select/Select";
import { Headquarters } from "@/types/headquarters";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from 'react';
import Badge from '../ui/badge/Badge';
import { Repeat2 } from 'lucide-react';
import Loading from '@/app/loading';
import Alert from '../ui/alert/Alert';



const SelectHeadquarters = () => {

    // ZUSTAND STORES
    const { allHeadquarters, setCurrentHeadquarter, currentHeadquarter, clearHeadquarter } = useHeadquarterStore();
    const { userInfo } = useUserStore();


    // HOOKS

    // Fallback de IDs si recargan la página directamente
    let hqIds = (allHeadquarters && allHeadquarters.length > 0)
        ? allHeadquarters
        : (userInfo?.idHeadquarter || []);

    const queryClient = useQueryClient();

    // FETCH TODAS LAS SEDES
    const {
        data: dataHq,
        isLoading,
        isError,
        refetch: refetchAllHq,
    } = useQuery({
        queryKey: ['headquarter-by-id-select', hqIds],
        queryFn: () => {
            return Promise.all(
                hqIds.map(idHq => HeadquartersActionService.getHqsById(idHq))
            );
        },
        // enabled: hqIds.length > 0,
    });

    const { mutate: getNewHqData, isPending, isError: newHqError } = useMutation({
        mutationKey: ['new-hq-by-id-select'],
        mutationFn: (idHq: string) => HeadquartersActionService.getHqsById(idHq),
        onSuccess: (res) => {
            setCurrentHeadquarter(res);
            // Refresca todas las consultas en pantalla con la nueva sede:
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            console.error('getNewHqData', error?.message || 'Error al obtener el cambio de sede');
        }

    });


    // HANDLER SELECCIÓN DE CAMBIO DE SEDE
    const handleSelectHeadquarter = (headquarterId: Headquarters['id']) => {
        getNewHqData(headquarterId);
    };


    // RENDER

    return (
        <>
            {/* AL CAMBIAR DE SEDE, SE BLOQUEA LA PANTALLA CON EL LOADER */}

            {
                isPending && <div className='fixed w-screen h-screen inset-0 z-99999 bg-black backdrop-blur-sm flex items-center justify-center'><Loading showSkeleton={false} /></div>
            }

            {
                newHqError && (
                    <Alert className='absolute translate-x-1/2 ' position='top-center' title='Error al cambiar de sede' variant='error' timer={3000} showClose={true} />
                )
            }


            {/* ESTO APLICA CUANDO SOLO SE CARGA EL SELECT Y SE MUESTRA */}
            {
                isLoading && (
                    <div className='loader-small' />
                )
            }
            {
                !isLoading && isError && (
                    <div className='flex flex-col justify-center gap-2'>

                        <Badge variant='light' color='error' size='sm'>
                            <span>
                                No se han podido obtener las sedes
                            </span>
                        </Badge>
                        <button
                            onClick={() => { refetchAllHq(); }}
                            className='w-fit mx-auto rounded-lg mt-1 flex gap-1 text-xs p-1 bg-brand text-light'> <Repeat2 size={15} /> Intentar nuevamente</button>
                    </div>

                )
            }
            {
                dataHq && dataHq?.length > 1 && (
                    <div className={"mb-4 bg-brand dark:bg-brand-dark overflow-hidden rounded-lg font-bold italic"}>
                        <Select
                            size='sm'
                            placeholder={"Seleciona una sede"}
                            options={dataHq?.map((hq) => ({ value: hq.id, label: hq.name })) || []}
                            value={currentHeadquarter?.id || ''}
                            className="text-light dark:bg-transparent "
                            colorIcon="text-light"
                            onChange={(e) => {
                                const hqId = e.target.value;
                                handleSelectHeadquarter(hqId);
                            }}

                        />
                    </div>

                )
            }
        </>
    );
};

export default SelectHeadquarters;