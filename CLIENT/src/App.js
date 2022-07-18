import React, { Component, useEffect, useState } from 'react';
import Header from './components/header-component/header-component';
import AdListing from './components/ads-component/ads-component';
import PromotedCoin from './components/promoted-coins/promoted-coins-component';
import NavPage from './components/nav-component/nav-component';
import { Route, Routes } from 'react-router-dom';
import AllCoins from '../src/components/pages/all-coins/all-coins-component';
import CoinDetails from '../src/components/pages/coin-details/coin-details-component';
import TopCoins from './components/pages/top-coins/top-coins-component';
import NewCoins from '../src/components/pages/new-coins/new-coins-component';
import DoxxedCoins from '../src/components/pages/doxxed-coins/doxxed-coins-component';
import PresaleCoins from '../src/components/pages/presale-coins/presale-coins-component';
import Footer from '../src/components/footer-component/footer-component';
import AddCoin from '../src/components/pages/add-coin/add-coin-component';
import PromoteAndBooking from '../src/components/pages/booking-promo/booking-promo-component';
import TermAndConditions from '../src/components/terms-and-condition/terms-and-conditions-component';
import PrivacyPolicy from '../src/components/privacy-policy/privacy-policy-component';
import { MissingRoute } from './utils/MissingRoute';
import sharedLinkImage from '../public/images/logo-racoins-313.png';
import notFound404 from '../public/images/404.png';

require('./styles/app.scss');

export default function App() {
    return (
        <div>
             <>
                <div className="header-container">
                    <div className="container">
                        <Header />
                    </div>
                </div>
                <div className="App-container">
                    <div className='main-section-wrapper'>
                        <Routes>
                            <Route exact path='/booking' element={
                                <>
                                    <PromoteAndBooking />
                                </>
                            }>
                            </Route>
                            <Route exact path='/terms-and-conditions' element={
                                <>
                                    <TermAndConditions />
                                </>
                            }>
                            </Route>
                            <Route exact path='/privacy-policy' element={
                                <>
                                    <PrivacyPolicy />
                                </>
                            }>
                            </Route>
                            <Route exact path="/add-coin" element={
                                    <>
                                        <div className="ads-container">
                                            <AdListing />
                                        </div>
                                        <AddCoin />
                                        <div className="promoted-coin-container">
                                            <PromotedCoin />
                                        </div>
                                    </>
                                }>
                            </Route>
                            <Route exact path="*" element={
                                <MissingRoute />
                                }>
                            </Route>
                            <Route exact path="/" element={
                                <>
                                    <div className="ads-container">
                                        <AdListing />
                                    </div>
                                    <div className="promoted-coin-container">
                                        <PromotedCoin />
                                        <TopCoins />
                                    </div>
                                    <div className="navpage-container">
                                        <NavPage />
                                    </div>
                                    <div>
                                        <AllCoins />
                                    </div>
                                </>
                            }>
                            </Route>
                            <Route exact path="/new-coins" element={
                                <>
                                    <div className="ads-container">
                                        <AdListing />
                                    </div>
                                    <div className="promoted-coin-container">
                                        <PromotedCoin />
                                        <TopCoins />
                                    </div>
                                    <div className="navpage-container">
                                        <NavPage />
                                    </div>
                                    <NewCoins />
                                </>
                            }>
                            </Route>
                            <Route exact path="/all-coins" element={
                                <>
                                    <div className="ads-container">
                                        <AdListing />
                                    </div>
                                    <div className="promoted-coin-container">
                                        <PromotedCoin />
                                        <TopCoins />
                                    </div>
                                    <div className="navpage-container">
                                        <NavPage />
                                    </div>
                                    <AllCoins />
                                </>
                            }>
                            </Route>
                            <Route exact path="/all-time-best" element={
                                <>
                                    <div className="ads-container">
                                        <AdListing />
                                    </div>
                                    <div className="promoted-coin-container">
                                        <PromotedCoin />
                                        <TopCoins />
                                    </div>
                                    <div className="navpage-container">
                                        <NavPage />
                                    </div>
                                </>
                            }>
                            </Route>
                            <Route exact path="/doxxed" element={
                                <>
                                    <div className="ads-container">
                                        <AdListing />
                                    </div>
                                    <div className="promoted-coin-container">
                                        <PromotedCoin />
                                        <TopCoins />
                                    </div>
                                    <div className="navpage-container">
                                        <NavPage />
                                    </div>
                                    <DoxxedCoins />
                                </>
                            }>
                            </Route>
                            <Route exact path="/presale" element={
                                <>
                                    <div className="ads-container">
                                        <AdListing />
                                    </div>
                                    <div className="promoted-coin-container">
                                        <PromotedCoin />
                                        <TopCoins />
                                    </div>
                                    <div className="navpage-container">
                                        <NavPage />
                                    </div>
                                    <PresaleCoins />
                                </>
                            }>
                            </Route>
                            <Route exact path="/coin/:id" element={
                                <>
                                    <div className="ads-container">
                                        <AdListing />
                                    </div>
                                    <CoinDetails />
                                    <div className="promoted-coin-container">
                                        <PromotedCoin />
                                    </div>
                                </>
                            }>
                            </Route>
                        </Routes>
                    </div>
                
                </div>
                <div className='footer-container'>
                    <Footer />
                </div>
            </>
        </div>
    );
}
