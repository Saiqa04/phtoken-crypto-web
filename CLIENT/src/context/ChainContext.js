import { useQuery,useLazyQuery } from "@apollo/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {GET_CHAINS} from '../services/graphql';

const ChainContext = createContext();

export const ChainContextProvider = ({children}) => {

    const [getChains, {loading, data}] = useLazyQuery(GET_CHAINS);
    const [chains, setChains] = useState([]);

    useEffect(() => {
        if(window.location.pathname.startsWith("/add-coin")){
            getChains();
        }
        
        setChains(data?.Chains);
    },[data])

    return(
        <ChainContext.Provider value={{chains}}>
            {children}
        </ChainContext.Provider>
    );
}

export const useChainContext = () => useContext(ChainContext);