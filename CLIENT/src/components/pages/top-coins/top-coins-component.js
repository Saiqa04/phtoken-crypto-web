import React, {useEffect, useState} from 'react';
import moment from 'moment';
import { useLazyQuery, useQuery } from '@apollo/client';
import {GET_TODAYS_TOP, GET_TOP_COINS } from '../../../services/graphql'
import MessageSnackBar from '../../../popups/MessageSnackBar';
import { useChainContext } from '../../../context/ChainContext';
import { FetchCoin24hChange, FetchCoinMarketCap, FetchCoinPrice } from '../../../helpers/CoinDataHelper';
import fire from '../../../../public/icons/fire-icon.png';
import {twitterColored, discordColored, telegramColored, chromeColored} from '../../../utils/SvgIcons';
import {svgArrowUp} from '../../../utils/SvgIcons';

require('../page-theme.scss');


export default function TodaysTop() {
    const {chains} = useChainContext();
    
    const [active, setActive] = useState();

    const [snackBar, setSnackBar] = useState({
        type: "success",
        message: "",
        open: false
    })

    const [getTopCoins, {data, networkStatus}] = useLazyQuery(GET_TOP_COINS, {
        notifyOnNetworkStatusChange: true
    });

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
            setSnackBar({
                ...snackBar,
                open: false
            })
    };


    const GetTopCoinsToday = () => {
        getTopCoins({
            variables: {
                offset: 0,
                query: 'VoteToday'
            }
        })
        setActive('todaystop');
    }

    const GetTopCoinsAllTime = () => {
        getTopCoins({
            variables: {
                offset: 0,
                query: 'AllTimeVote'
            }
        })
        setActive('alltime');
    }
    useEffect(() => {
        getTopCoins({
            variables: {
                offset: 0,
                query: 'VoteToday'
            }
        })
        setActive('todaystop');
    },[])

    return (
        <div className="coin-page">
             <MessageSnackBar open={snackBar.open} type={snackBar.type} close={handleCloseSnackbar} message={snackBar.message}/>
             <button className={active === 'todaystop' ? 'active top-coin-table-nav' : 'top-coin-table-nav'} onClick={() =>  GetTopCoinsToday()}>Todays top</button>
             <button className={active === 'alltime' ? 'active top-coin-table-nav' : 'top-coin-table-nav'} onClick={() =>  GetTopCoinsAllTime()}>All-time best</button>
             <div className='table-container'>
                <table className='table top-coin-table' style={{width: "100%"}}>
                    <thead key="thead">
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Name</th>
                            <th>Chain</th>
                            <th>Price</th>
                            <th>24H %</th>
                            <th>Market Cap</th>
                            <th>Platforms</th>
                            <th>Launch</th>
                            <th>Upvotes(+24H)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody key="tbody">
                    {networkStatus === 1 ? <tr></tr>: data ? <>
                        {data.TopCoins.map((row, index) => (
                            <tr key={row.CoinID}>
                                <td>{index + 1}</td>
                                <td><img className='logoIcon' src={row.LogoLink}/></td>
                                <td>
                                    <div className='row-name-flex'>
                                        <div>
                                            <div><a className='coin-name' href={`/coin/${row.Symbol}`}>{row.Name}</a>
                                            <span style={{color: '#6d7791'}}>&nbsp;{"$"+row.Symbol}</span></div> 
                                            <div> {(row.AuditLink) === null || row.AuditLink === "" ? "" : <span className="audited">Audited</span>}{(row.IsDoxxed) == false || (row.IsDoxxed) === 0 ?  "" : <span className="doxxed">Doxxed</span>}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='row-name-flex'>
                                        <div className='chain-wrapper'>
                                            {chains?.filter((e) => e.ChainSymbol === row.Chain).map((chain) =>
                                            chain.Logo === "" || chain.Logo === null ? "" : 
                                            <img key={Math.random()} className='logoChain' src={chain.Logo}/>)}
                                            <span className='chain'>{row.Chain}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <FetchCoinPrice data={row}/>
                                </td>
                                <td><FetchCoin24hChange data={row}/></td>
                                <td><FetchCoinMarketCap data={row}/></td>
                                <td>
                                {
                                    <div className='platforms'>
                                        {row.Telegram !== "" ? <a href={row.Telegram} target="_blank">{telegramColored}</a> : ""}
                                        {row.Twitter !== "" ?   <a href={row.Twitter} target="_blank">{twitterColored}</a> : ""}
                                        {row.Discord !== "" ? <a href={row.Discord} target="_blank">{discordColored}</a> : ""}
                                        {row.Website !== "" ? <a href={row.Website} target="_blank">{chromeColored}</a> : ""}
                                    </div>
                                }
                                </td>
                                <td>{moment(row.LaunchDate, "YYYYMMDD").fromNow()}</td>
                                <td>{row.AllTimeVote}&nbsp;&nbsp;<span style={{fontSize: 14,color:'#18c477'}}>{svgArrowUp}{row.VoteToday}</span></td>
                                <td>
                                    <a className={(row.IsUpvoted ? "button voted" : "button normal")} 
                                    href={`/coin/${row.Symbol}`}>VOTE</a>
                                </td>
                            </tr>
                        ))}
                        </>  : <tr></tr>} 
                    </tbody>              
                </table>
             </div>
        </div>
    );
        
}

