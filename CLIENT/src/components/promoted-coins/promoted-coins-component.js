import React, {  useMemo, useState } from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { NavLink, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import {GET_PROMOTED_COINS} from '../../services/graphql'
import MessageSnackBar from '../../popups/MessageSnackBar';
import { useChainContext } from '../../context/ChainContext';
import { FetchCoin24hChange, FetchCoinMarketCap, FetchCoinPrice } from '../../helpers/CoinDataHelper';
require('../pages/page-theme.scss');


function PromotedCoins() {
    const {chains} = useChainContext();

    const [snackBar, setSnackBar] = React.useState({
        type: "success",
        message: "",
        open: false
    })
    const {data, loading} = useQuery(GET_PROMOTED_COINS);
    
   
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
            <label className='promoted-label'>Promoted Coins</label>
            <table style={{width: "100%"}}>
                <thead key="thead">
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Chain</th>
                        <th>Price</th>
                        <th>24h %</th>
                        <th>Market Cap</th>
                        <th>Launch</th>
                        <th>Upvotes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody key="tbody">
                    {data?.PromotedCoins.map((row) => (
                        <tr key={row.Coins.CoinID}>
                            <td>{row.Coins.CoinID}</td>
                            <td><img className='logoIcon' src={row.Coins.LogoLink}/></td>
                            <td>
                                <div className='row-name-flex'>
                                    <div>
                                        <div><a className='coin-name' href={`/coin/${row.Coins.CoinID}`}>{row.Coins.Name}</a></div> 
                                         {/*<div><span onClick={() => viewCoinDetails(row)} className="coin-name">{row.Coins.Name}</span></div>*/} 
                                        <div style={{height: 'auto'}}>{(row.Coins.AuditLink) === null || row.Coins.AuditLink === "" ? "" : <span className="audited">Audited</span>}{(row.Coins.IsDoxxed) == false || (row.Coins.IsDoxxed) === 0 ?  "" : <span className="doxxed">Doxxed</span>}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{row.Coins.Symbol}</td>
                            <td>
                                <div className='row-name-flex'>
                                    {chains?.filter((e) => e.ChainSymbol === row.Coins.Chain).map((chain) =>
                                        chain.Logo === "" || chain.Logo === null ? "" : 
                                        <img key={Math.random()} className='logoChain' src={chain.Logo}/>)}
                                    <span className='chain'>{row.Coins.Chain}</span>
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
                            <td>{moment(row.Coins.LaunchDate, "YYYYMMDD").fromNow()}</td>
                            <td>{row.Coins.AllTimeVote}</td>
                            <td><a className={(row.Coins.IsUpvoted ? "button voted" : "button normal")} 
                                href={`/coin/${row.Coins.CoinID}`}>VOTE</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loading ? <div style={{width: '100%', minHeight: 300, textAlign: 'center'}}><CircularProgress /></div>:
                !data ? <p style={{color: '#5c5c5c', fontSize: 14, textAlign: 'center'}}>Unable to load data.</p> :
                <div style={{width: '100%', textAlign: 'center'}} >
                    {data?.PromotedCoins.length === 0 ? <p style={{color: '#5c5c5c', fontSize: 14}}><span>No promoted coins found.</span> <br /> Promote your coin by&nbsp;
                    <NavLink style={{color: '#3CAFF0', textDecoration: 'none', cursor: 'pointer'}} to="/booking">clicking here.</NavLink></p> : ""}
                </div> 
            }
        </div>
    );
}

export default  PromotedCoins;