import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/home/HeroSection';
import Categories from '../components/home/Categories';
import TopDeals from '../components/home/TopDeals';
import PromoGrids from '../components/home/PromoGrids';
import CustomersLovedProducts from '../components/home/CustomersLovedProducts';

const Home = () => {
    return (
        <div className="min-h-screen bg-white pb-20">
            <Header />
            <main className="max-w-[1440px] mx-auto">
                <HeroSection />
                <Categories />
                <TopDeals />
                <PromoGrids />
                <CustomersLovedProducts />
            </main>
        </div>
    );
};

export default Home;
