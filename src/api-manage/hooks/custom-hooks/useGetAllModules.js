import React, {useEffect, useState} from 'react';
import useGetModule from "../react-query/useGetModule";

export const useGetAllModules = () => {
    const {data, refetch, isLoading} = useGetModule()
    useEffect(() => {
        refetch()
    }, []);

    return {data,isLoading};
};