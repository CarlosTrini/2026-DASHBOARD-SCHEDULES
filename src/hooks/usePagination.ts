import { ResponseDataPaginated } from "@/types/apiTypes";
import { useEffect, useState } from "react";
import { useParamsUrl } from "@/hooks/useParamsUrl";

interface Props {
    initPage?: number;
    initLimit?: number;
}

export const usePagination = <T>({ initPage = 1, initLimit = 10 }: Props = {}) => {
    const { updateAddParam, deleteParam, getParam } = useParamsUrl();

    const [paginationInfo, setPaginationInfo] = useState<ResponseDataPaginated<T> | null>(null);
    const [page, setPage] = useState(Number(getParam('page')) || initPage);
    const [limit, setLimit] = useState(Number(getParam('limit')) || initLimit);

    useEffect(() => {


        if (page > 1) {
            updateAddParam('page', page.toString());
        } else {
            deleteParam('page');
        }

        if (limit !== initLimit) {
            updateAddParam('limit', limit.toString());
        } else {
            deleteParam('limit');
        }
    }, [page, limit]);

    return {
        page,
        limit,
        paginationInfo,
        setPage,
        setLimit,
        setPaginationInfo,
    };
};