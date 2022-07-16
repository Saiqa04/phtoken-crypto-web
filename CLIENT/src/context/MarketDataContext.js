import { useQuery,useLazyQuery } from "@apollo/client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_ALL_ADDRESSES } from "../services/graphql";

const MarketDataContext = createContext();

const initialValue = [
    {address: null, priceUsd: null, priceChange24hAgo: null, marketCapUsd: null, totalReserveUsd: null}
]
export const MarketDataContextProvider = ({children}) => {
    const [getAdress, {loading, data}] = useLazyQuery(GET_ALL_ADDRESSES, {
        variables: {
            limit: 250
        }
    });

    const [marketData, setMarketData] = useState(initialValue)
    const [coinsAddresses, setCoinAddresses] = useState([]);
    

    useEffect(() =>{
        const fetchAddress = async () => {
            await data?.ContractAddresses.forEach((coin) => {
                setCoinAddresses(oldArray => [...oldArray, coin.ContractAddress])
            })
        }
        const fetchMarketData = async () => {
            await axios.post("https://api.coinbrain.com/public/coin-info", {
                "56" : coinsAddresses
            }).then((res) => {
               res.data.map((d) => {
                    setMarketData(oldValue => [...oldValue, {
                        address: d.address,
                        priceUsd: d.priceUsd === null ? 0.00 : d.priceUsd,
                        priceChange24hAgo: d.priceUsd24hAgo === null ? 0.00 : ((d.priceUsd.toFixed(15) - d.priceUsd24hAgo.toFixed(15)) / d.priceUsd24hAgo.toFixed(15) * 100).toFixed(2),
                        marketCapUsd: d.marketCapUsd === null ? 0.00 : d.marketCapUsd,
                        totalReserveUsd: d.totalReserveUsd === null ? 0.00 : d.totalReserveUsd
                    }])
               })
            })
        }

        if(window.location.pathname === "/" || window.location.pathname.startsWith('/coin') 
            || window.location.pathname === "/all-coins"
            || window.location.pathname === "/new-coins" || window.location.pathname === "/doxxed" 
            || window.location.pathname === "/presale"){
            getAdress();
        }
        
        if(coinsAddresses.length > 0){
            fetchMarketData();
        }else{
            fetchAddress();
        }

    },[data, coinsAddresses])
    return(
        <MarketDataContext.Provider value={{marketData}}>
            {children}
        </MarketDataContext.Provider>
    );
}

export const useMarketDataContext = () => useContext(MarketDataContext);