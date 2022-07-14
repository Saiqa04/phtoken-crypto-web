import React, {  useMemo, useState } from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { CircularProgress, Skeleton, Stack } from '@mui/material';
import {GET_PROMOTED_COINS} from '../../services/graphql'
import MessageSnackBar from '../../popups/MessageSnackBar';
import { useChainContext } from '../../context/ChainContext';
import { FetchCoin24hChange, FetchCoinMarketCap, FetchCoinPrice } from '../../helpers/CoinDataHelper';
import star from '../../../public/icons/star-48.png';
import {twitterColored, discordColored, telegramColored, chromeColored, svgArrowUp} from '../../utils/SvgIcons';
require('../pages/page-theme.scss');


function PromotedCoins() {
    const {chains} = useChainContext();

    const [snackBar, setSnackBar] = React.useState({
        type: "success",
        message: "",
        open: false
    })
    const {data, loading,networkStatus} = useQuery(GET_PROMOTED_COINS, {
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

    return (
        <div className="coin-page">
            <MessageSnackBar open={snackBar.open} type={snackBar.type} close={handleCloseSnackbar} message={snackBar.message}/>
            <div className='table-container'>
                <table className='table promoted-coin-table' style={{width: "100%"}}>
                    <thead key="thead">
                        <tr className='table-top-label promoted-section'>
                            <th colSpan={11}><img src={star}/>Promoted coins</th>
                        </tr>
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
                        {data?.PromotedCoins.map((row,index) => (
                            <tr key={row.Coins.CoinID}>
                                <td>{index + 1}</td>
                                <td><img className='logoIcon' src={row.Coins.LogoLink}/></td>
                                <td>
                                    <div className='row-name-flex'>
                                        <div>
                                            <div><a className='coin-name' href={`/coin/${row.Coins.CoinID}`}>{row.Coins.Name}</a>
                                            <span style={{color: '#6d7791'}}>&nbsp;{"$"+row.Coins.Symbol}</span></div> 
                                            <div> {(row.Coins.AuditLink) === null || row.Coins.AuditLink === "" ? "" : <span className="audited">Audited</span>}{(row.Coins.IsDoxxed) == false || (row.Coins.IsDoxxed) === 0 ?  "" : <span className="doxxed">Doxxed</span>}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='row-name-flex'>
                                        <div className='chain-wrapper'>
                                            {chains?.filter((e) => e.ChainSymbol === row.Coins.Chain).map((chain) =>
                                            chain.Logo === "" || chain.Logo === null ? "" : 
                                            <img key={Math.random()} className='logoChain' src={chain.Logo}/>)}
                                            <span className='chain'>{row.Coins.Chain}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <FetchCoinPrice data={row.Coins}/>
                                </td>
                                <td>
                                    <FetchCoin24hChange data={row.Coins} />
                                </td>
                                <td>
                                    <FetchCoinMarketCap data={row.Coins}/>
                                </td>
                                <td>
                                {
                                    <div className='platforms'>
                                        {row.Coins.Telegram !== "" ? <a href={row.Coins.Telegram} target="_blank">{telegramColored}</a> : ""}
                                        {row.Coins.Twitter !== "" ?   <a href={row.Coins.Twitter} target="_blank">{twitterColored}</a> : ""}
                                        {row.Coins.Discord !== "" ? <a href={row.Coins.Discord} target="_blank">{discordColored}</a> : ""}
                                        {row.Coins.Website !== "" ? <a href={row.Coins.Website} target="_blank">{chromeColored}</a> : ""}
                                    </div>
                                }
                                </td>
                                <td>{moment(row.Coins.LaunchDate, "YYYYMMDD").fromNow()}</td>
                                <td>{row.Coins.AllTimeVote}&nbsp;&nbsp;<span style={{fontSize: 14,color:'#18c477'}}>{svgArrowUp}{row.Coins.VoteToday}</span></td>
                                <td><a className={(row.Coins.IsUpvoted ? "button voted" : "button normal")} 
                                    href={`/coin/${row.Coins.CoinID}`}>VOTE</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading ? // Fetching daata
            <div style={{backgroundColor: '#1d2744'}} className='show-more'>
                <Stack>
                    <Skeleton width={'100%'} animation='wave'/>
                    <Skeleton width={'100%'} animation='wave'/>
                </Stack>
            </div> : !data ? // Failed to fetch data
            <div style={{backgroundColor: '#1d2744'}} className='show-more'>
                <span>-/- No Data -/-</span>
            </div> :
            <div style={{backgroundColor: '#1d2744'}} className='show-more'>
                <span>Your coin here? Click <a href='/booking' className='promote-button'>Promote</a></span>
            </div> 
            }
        </div>
    );
}

export default  PromotedCoins;