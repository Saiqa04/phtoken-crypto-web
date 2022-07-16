import React, {useState} from 'react';
import moment from 'moment';
import { useQuery  } from '@apollo/client';
import { useNavigate, NavLink } from 'react-router-dom';
import { CircularProgress, Skeleton, Stack } from '@mui/material';
import {GET_NEW_COINS } from '../../../services/graphql'
import MessageSnackBar from '../../../popups/MessageSnackBar';
import { useChainContext } from '../../../context/ChainContext';
import { FetchCoin24hChange, FetchCoinMarketCap, FetchCoinPrice } from '../../../helpers/CoinDataHelper';
import {svgArrowUp} from '../../../utils/SvgIcons';

require('../page-theme.scss');


export default function NewCoins() {
    const {chains} = useChainContext();
    
    const [snackBar, setSnackBar] = React.useState({
        type: "success",
        message: "",
        open: false
    })

    const {loading, data, fetchMore, networkStatus} = useQuery(GET_NEW_COINS, {
        notifyOnNetworkStatusChange: true,
        variables: {
            offset: 0,
            limit: 1
        }
    });

    const onLoadMore = () => {
        try {
            fetchMore({
                variables: {
                    offset: data.NewCoins.length
                }
            });
        } catch (err) {
            return err
        }
    } 

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
                <table className='table' style={{width: "100%"}}>
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
                            <th>Upvotes(+24H)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody key="tbody">
                        {data?.NewCoins.map((row, index) => (
                            <tr key={row.CoinID}>
                                <td>{index + 1}</td>
                                <td><img className='logoIcon' src={row.LogoLink}/></td>
                                <td>
                                    <div className='row-name-flex'>
                                            <div>
                                                <div><a className='coin-name' href={`/coin/${row.Symbol}`}>{row.Name}</a></div> 
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
                                <td>{row.AllTimeVote}&nbsp;&nbsp;<span style={{fontSize: 14,color:'#18c477'}}>{svgArrowUp}{row.VoteToday}</span></td>
                                <td>
                                    <a className={(row.IsUpvoted ? "button voted" : "button normal")} 
                                    href={`/coin/${row.Symbol}`}>VOTE</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>                    
                </table>
            </div>
            <div className='show-more'>
                {networkStatus === 1 || networkStatus === 3 /*Fetch or Refetching Data*/ ? 
                    <Stack>
                        <Skeleton width={'100%'} animation='wave'/>
                        <Skeleton width={'100%'} animation='wave'/>
                    </Stack> : data ? /*Success fetching Data*/
                    <button onClick={() => onLoadMore()}
                        className='show-more-btn'>
                        <i className="fa-solid fa-chevron-down"></i>
                        Show More
                    </button> :  <span>-/- No Data -/-</span>
                }
            </div>
        </div>
    );
        
}

