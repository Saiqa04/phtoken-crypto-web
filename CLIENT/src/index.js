import React, {} from 'react';
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
  } from "@apollo/client";
import { offsetLimitPagination } from '@apollo/client/utilities';
import { ChainContextProvider } from './context/ChainContext';
import { MarketDataContextProvider } from './context/MarketDataContext';
import { createRoot } from 'react-dom/client';
import Maintenance from '../src/components/maintenance-component/maintenance-component';
import {MissingRoute} from '../src/utils/MissingRoute';
import ComingSoon from './components/coming-soon/coming-soon-component';
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorHandler} from './helpers/ErrorHandler'

  const production = "production";
  const development = "development";

  if(process.env.NODE_ENV === development){
    var client = new ApolloClient({
      uri: 'http://192.168.254.127:5000/api/graphql',
      cache: new InMemoryCache({
        typePolicies: {
          Coin: {
            keyFields: ["CoinID"]
          },
          Query: {
            fields: {
              Coins: offsetLimitPagination(),
              TodaysTop: offsetLimitPagination(),
              NewCoins: offsetLimitPagination(),
              AllTimeBest: offsetLimitPagination(),
              Doxxed: offsetLimitPagination(),
              Presale: offsetLimitPagination(),
            }
          }
        }
      })
    });
  }

  if(process.env.NODE_ENV === production){
    var client = new ApolloClient({
    ///uri: 'http://localhost:5000/api/graphql',
     uri: 'https://racoins.cc/api/graphql',
      cache: new InMemoryCache({
        typePolicies: {
          Coins: {
            keyFields: ["CoinID"]
          },
          Query: {
            fields: {
              Coins: offsetLimitPagination(),
              TodaysTop: offsetLimitPagination(),
              NewCoins: offsetLimitPagination(),
              AllTimeBest: offsetLimitPagination(),
              Doxxed: offsetLimitPagination(),
              Presale: offsetLimitPagination(),
            }
          }
        }
      })
    });
  }

  const container = document.getElementById('root');
  const root = createRoot(container);
  if(process.env.COMING_SOON === "true"){
    root.render(
      <ApolloProvider client={client}>
        <ChainContextProvider>
          <Router>
            <Routes>
                <Route exact path='/' element={
                    <ComingSoon />
                  }>  
                </Route>
                <Route exact path='*' element={
                    <MissingRoute />
                }>  
                </Route>
            </Routes>
        </Router>
        </ChainContextProvider>
      </ApolloProvider>
    )
  }else if(process.env.MAINTENANCE === "true"){
    root.render(
      <Router>
        <Routes>
          <Route exact path='/' element={
              <Maintenance />
            }>  
          </Route>
          <Route exact path='*' element={
              <MissingRoute />
          }>  
          </Route>
        </Routes>
      </Router>
    )
  }else{
    root.render(
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <ApolloProvider client={client}> 
          <MarketDataContextProvider>
            <ChainContextProvider>
                <Router>
                      <App />
                </Router>
            </ChainContextProvider>
          </MarketDataContextProvider>
        </ApolloProvider>
      </ErrorBoundary>
    )
  }


  if (module.hot) {
      module.hot.accept();
  }