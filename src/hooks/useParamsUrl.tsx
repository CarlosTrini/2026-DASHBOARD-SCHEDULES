import { ResponseDataPaginated } from "@/types/apiTypes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export const useParamsUrl = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());


    const updateAddParam = (nameParam: string = '', value: string = '') => {
        if (!nameParam || nameParam == '' || !value || value == '') return;
        params.set(nameParam, value);
        updateUrl();
    }

    const deleteParam = (nameParam: string = '') => {
        if (!nameParam || nameParam == '') return;
        params.delete(nameParam);
        updateUrl();
    }

    const getParam = (nameParam: string = '') => {
        if (!nameParam || nameParam == '') return;
        return params.get(nameParam);
    }

    const updateUrl = () => {
        // if (!window) return;
        // const query = params.toString();
        // window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
    }

    return {
        getParam,
        updateAddParam,
        deleteParam
    };
};