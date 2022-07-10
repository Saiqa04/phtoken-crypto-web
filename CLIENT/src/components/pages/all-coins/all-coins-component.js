import React, {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { useNavigate, NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import {GET_COINS } from '../../../services/graphql'
import MessageSnackBar from '../../../popups/MessageSnackBar';
import { useChainContext } from '../../../context/ChainContext';
import { FetchCoin24hChange, FetchCoinMarketCap, FetchCoinPrice } from '../../../helpers/CoinDataHelper';

require('../page-theme.scss');


export default function AllCoins() {

    const {chains} = useChainContext();

    const [snackBar, setSnackBar] = React.useState({
        type: "success",
        message: "",
        open: false
    })

    const {loading, data, fetchMore, networkStatus} = useQuery(GET_COINS, {
        notifyOnNetworkStatusChange: true,
        variables: {
            offset: 0
        }
    });


    const onLoadMore = () => {
        try {
            fetchMore({
                variables: {
                    offset: data.Coins.length
                },
            });
        } catch (err) {
            return err
        }
    } 

    // Changed to traditional page routing
    /* 
    const navigate = useNavigate();
    const viewCoinDetails = (coinInfo) => {
        navigate(`/coin/${coinInfo.CoinID}`, {
            state: coinInfo
        });
    };
    const handleVoteClick = (row) => {
        viewCoinDetails(row);
    }
   */
    
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
                {networkStatus === 1 ? <tr></tr>: data ? <>
                    {data.Coins.map((row) => (
                        <tr key={row.CoinID}>
                            <td>{row.CoinID}</td>
                            <td><img className='logoIcon' src={row.LogoLink}/></td>
                            <td>
                                <div className='row-name-flex'>
                                        <div>
                                            <div><a className='coin-name' href={`/coin/${row.CoinID}`}>{row.Name}</a></div> 
                                            {/*<div><span onClick={() => viewCoinDetails(row)} className="coin-name">{row.Name}</span></div>*/}
                                            <div> {(row.AuditLink) === null || row.AuditLink === "" ? "" : <span className="audited">Audited</span>}{(row.IsDoxxed) == false || (row.IsDoxxed) === 0 ?  "" : <span className="doxxed">Doxxed</span>}</div>
                                        </div>
                                    </div>
                                </td>
                            <td>{row.Symbol}</td>   
                            <td>
                                <div className='row-name-flex'>
                                    {chains?.filter((e) => e.ChainSymbol === row.Chain).map((chain) =>
                                        chain.Logo === "" || chain.Logo === null ? "" : 
                                        <img key={Math.random()} className='logoChain' src={chain.Logo}/>)}
                                    <span className='chain'>{row.Chain}</span>
                                </div>
                            </td>
                            <td>
                                <FetchCoinPrice data={row}/>
                            </td>
                            <td>
                                <FetchCoin24hChange data={row} />
                            </td>
                            <td>
                                 <FetchCoinMarketCap data={row}/>
                            </td>
                            <td>{moment(row.LaunchDate, "YYYYMMDD").fromNow()}</td>
                            <td>{row.AllTimeVote}</td>
                            <td>
                                <a className={(row.IsUpvoted ? "button voted" : "button normal")} 
                                href={`/coin/${row.CoinID}`}>VOTE</a>
                            </td>
                        </tr>
                    ))}
                    </>  : <tr></tr>} 
                </tbody>                    
            </table>
            {networkStatus === 1  ? <div style={{width: '100%', minHeight: 450, textAlign: 'center'}}><CircularProgress/></div> :
                !data ? <p style={{color: '#5c5c5c', fontSize: 14, textAlign: 'center'}}>Unable to load data.</p> :
                data?.Coins.length === 0 ? <p style={{color: '#5c5c5c', fontSize: 14, textAlign: 'center'}}>No listed coins found.&nbsp;
                    <NavLink style={{color: '#3CAFF0', textDecoration: 'none', cursor: 'pointer'}} to="/add-coin">Add coin.</NavLink></p> :
                <div style={{width: '100%', textAlign: 'center'}} >
                    <button className='loadMore' onClick={() => onLoadMore()}>{networkStatus === 3 ? <CircularProgress size={25}/> : "View More"}</button>
                </div> 
            }
        </div>
    );
        
}

