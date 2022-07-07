import React, {useState} from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { useNavigate, NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import {GET_TODAYS_TOP } from '../../../services/graphql'
import {svgArrowUp, svgArrowDown} from '../../../utils/SvgIcons';
import MessageSnackBar from '../../../popups/MessageSnackBar';
import { useChainContext } from '../../../context/ChainContext';
import { useMarketDataContext } from '../../../context/MarketDataContext';

require('../page-theme.scss');


export default function TodaysTop() {
    const {chains} = useChainContext();
    const {marketData} = useMarketDataContext();
    const [snackBar, setSnackBar] = useState({
        type: "success",
        message: "",
        open: false
    })

    const {loading, data, fetchMore, networkStatus} = useQuery(GET_TODAYS_TOP, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        variables: {
            offset: 0,
            limit: 1
        }
    });

    const onLoadMore = () => {
        try {
            fetchMore({
                variables: {
                    offset: data.TodaysTop.length
                }
            });
        } catch (err) {
            return err
        }
    } 

    const navigate = useNavigate();
    const viewCoinDetails = (coinInfo) => {
        navigate(`/coin/${coinInfo.CoinID}`, {
            state: coinInfo
        });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
            setSnackBar({
                ...snackBar,
                open: false
            })
    };

    const handleVoteClick = (row) => {
        viewCoinDetails(row);
    }


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
                    {data.TodaysTop.map((row) => (
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
                               {marketData.length === 0 ? "-" : 
                                    marketData?.filter((e) => e.address.toLowerCase() === row.ContractAddress.toLowerCase()).map((mData) =>
                                        <span key={row.CoinID}>{mData.priceUsd.toLocaleString("en-US",{minimumFractionDigits: 2, maximumFractionDigits: 10, style:"currency", currency: "USD"})}</span>
                                    )
                               }
                            </td>
                            <td>
                                {
                                    marketData.length === 0 ? "-" : 
                                    marketData?.filter((e) => e.address.toLowerCase() === row.ContractAddress.toLowerCase()).map((mData) => (
                                        ((mData.priceUsd.toFixed(15) - mData.priceUsd24hAgo.toFixed(15)) / mData.priceUsd24hAgo.toFixed(15) * 100) >= 0.00 ? 
                                        <span key={row.CoinID} className='price-up'>{svgArrowUp}&nbsp;{((mData.priceUsd.toFixed(15) - mData.priceUsd24hAgo.toFixed(15)) / mData.priceUsd24hAgo.toFixed(15) * 100).toFixed(2) + "%"}</span> : 
                                        <span key={row.CoinID} className='price-down'>{svgArrowDown}&nbsp;{((mData.priceUsd.toFixed(15) - mData.priceUsd24hAgo.toFixed(15)) / mData.priceUsd24hAgo.toFixed(15) * 100).toFixed(2) + "%"}</span>
                                    )
                                )}
                            </td>
                            <td>
                                {
                                    marketData.length === 0 ? "-" : 
                                    (row.IsPresale ? <span className='isPresale'>Presale</span> : marketData?.filter((e) => e.address.toLowerCase() === row.ContractAddress.toLowerCase()).map((mData) =>
                                        <span key={row.CoinID}>{mData.marketCapUsd.toLocaleString("en-US",{maximumFractionDigits: 2, style:"currency", currency: "USD"})}</span>
                                    ))
                                }
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
                data?.TodaysTop.length === 0 ? <p style={{color: '#5c5c5c', fontSize: 14, textAlign: 'center'}}>No listed coins found.&nbsp; 
                    <NavLink style={{color: '#3CAFF0', textDecoration: 'none', cursor: 'pointer'}} to="/add-coin">Add coin.</NavLink></p> :
                <div style={{width: '100%', textAlign: 'center'}} >
                    <button className='loadMore' onClick={() => onLoadMore()}>{networkStatus === 3 ? <CircularProgress size={25}/> : "View More"}</button>
                </div> 
            }
        </div>
    );
        
}

