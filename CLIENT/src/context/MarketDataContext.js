import { useQuery } from "@apollo/client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { GET_COINS } from "../services/graphql";

const MarketDataContext = createContext();


export const MarketDataContextProvider = ({children}) => {
    const {loading, data} = useQuery(GET_COINS, {
        variables: {
            offset: 0
        }
    });

    const [marketData, setMarketData] = useState([])
    const [coinsAddresses, setCoinAddresses] = useState([]);

    

    useEffect(() =>{

        const fetchAddress = async () => {
            await data?.Coins.forEach((coin) => {
                setCoinAddresses(oldArray => [...oldArray, coin.ContractAddress])
            })
        }
        const fetchMarketData = async () => {
            await axios.post("https://api.coinbrain.com/public/coin-info", {
                "56" : coinsAddresses
            }).then((res) => {
                setMarketData(res.data)
            })
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