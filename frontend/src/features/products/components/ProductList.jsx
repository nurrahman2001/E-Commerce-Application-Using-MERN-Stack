import React from 'react';
import { ProductBanner } from './ProductBanner';
import { banner1, banner2, banner3, banner4 } from '../../../assets';
import { BestSeller } from './BestSeller';
import { Category } from './Category';
import Features from './Features';
import { SaleBanner } from './SaleBanner';
import { Deals } from './Deals';

const bannerImages = [banner1, banner2, banner3, banner4];

export const ProductList = () => {
    return (
        <div className="bg-gray-200">
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px]">
                <ProductBanner images={bannerImages} />
            </div>
            <div className="  w-full px-10 ">
                <Features />
                <BestSeller />
                <Category />
                <SaleBanner/>
                <Deals/>
            </div>
        </div>
    );
};
