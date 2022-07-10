import React from "react";
import { useMarketDataContext } from "../context/MarketDataContext";
import NumberFormat from 'react-number-format';
import { svgArrowDown, svgArrowUp } from "../utils/SvgIcons";

export const FetchCoinPrice = ({data}) => {
    
    const {marketData} = useMarketDataContext();

    const result = marketData?.filter((e) => {
        if(e.address === data.ContractAddress){
           return e;
        }
    })

    if(result.length < 1) {
        return <span className='no-data'>-</span>
    }else{
        return <NumberFormat value={result[0].priceUsd}
            prefix={'$'}
            thousandSeparator={true}
            displayType={'text'}
            decimalScale={10}
        />
    }
}

export const FetchCoin24hChange = ({data}) => {
    
    const {marketData} = useMarketDataContext();

    const result = marketData?.filter((e) => {
        if(e.address === data.ContractAddress){
           return e;
        }
    })

    if(result.length < 1) {
        return <span className='no-data'>-</span> 
    }else{
        return result[0].priceChange24hAgo > 0 ? <span className="price-up">{svgArrowUp}&nbsp;{result[0].priceChange24hAgo} %</span> : 
               result[0].priceChange24hAgo < 0 ? <span className="price-down">{svgArrowDown}&nbsp;{result[0].priceChange24hAgo} %</span> :
               <span className="no-data">-</span>
    } 
}

export const FetchCoinMarketCap = ({data}) => {
    
    const {marketData} = useMarketDataContext();

    const result = marketData?.filter((e) => {
        if(e.address === data.ContractAddress){
           return e;
        }
    })
    if(result.length < 1) {
        return <span className='no-data'>-</span> 
    }else{
        return  data.IsPresale ? 
            <span className="isPresale">Presale</span> : 
            <NumberFormat value={result[0].marketCapUsd}
                prefix={'$'}
                thousandSeparator={true}
                displayType={'text'}
                allowLeadingZeros={false}
                decimalScale={2}
            />
    }
}

export const FetchLiquidity = ({data}) => {
    
    const {marketData} = useMarketDataContext();

    const result = marketData?.filter((e) => {
        if(e.address === data.ContractAddress){
           return e;
        }
    })
   
    if(result.length < 1) {
        return <span className='no-data'>-</span> 
    }else{
        return <NumberFormat value={result[0].totalReserveUsd}
            prefix={'$'}
            thousandSeparator={true}
            displayType={'text'}
            allowLeadingZeros={false}
            decimalScale={2}
        />
    }
}

