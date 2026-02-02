import React, { useEffect, useRef, useState } from 'react'
import TrendingPrimary from './TrendingSec'
import { topDataHandler } from '@/app/api/homeData';
import Loading from '../Loading';
interface Product {
    productid: number;
    title: string;
    price: number;
    discount: number;
    imglink: string;
    imgalt: string;
    category_name: string;
    maincategory:string;
}
interface data{
    trending:Product[];
    top_rated:Product[];
    new_arrival:Product[];
}

// Placeholder trending data to show when API fails
const placeholderTrendingData: data = {
    trending: [
        {
            productid: 201,
            title: "Trendy Sunglasses",
            price: 49.99,
            discount: 79.99,
            imglink: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
            imgalt: "Trendy Sunglasses",
            category_name: "Sunglasses",
            maincategory: "fashion"
        },
        {
            productid: 202,
            title: "Casual Sneakers",
            price: 89.99,
            discount: 129.99,
            imglink: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop",
            imgalt: "Casual Sneakers",
            category_name: "Casual",
            maincategory: "footwear"
        },
        {
            productid: 203,
            title: "Leather Wallet",
            price: 39.99,
            discount: 59.99,
            imglink: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
            imgalt: "Leather Wallet",
            category_name: "Wallet",
            maincategory: "men"
        },
        {
            productid: 204,
            title: "Smart Watch",
            price: 199.99,
            discount: 299.99,
            imglink: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
            imgalt: "Smart Watch",
            category_name: "Smart Watch",
            maincategory: "electronics"
        }
    ],
    top_rated: [
        {
            productid: 301,
            title: "Premium Headphones",
            price: 149.99,
            discount: 199.99,
            imglink: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
            imgalt: "Premium Headphones",
            category_name: "Headphone",
            maincategory: "electronics"
        },
        {
            productid: 302,
            title: "Designer Handbag",
            price: 129.99,
            discount: 179.99,
            imglink: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
            imgalt: "Designer Handbag",
            category_name: "Bags",
            maincategory: "women"
        },
        {
            productid: 303,
            title: "Running Shoes",
            price: 119.99,
            discount: 159.99,
            imglink: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
            imgalt: "Running Shoes",
            category_name: "Sport",
            maincategory: "footwear"
        },
        {
            productid: 304,
            title: "Luxury Perfume",
            price: 89.99,
            discount: 119.99,
            imglink: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop",
            imgalt: "Luxury Perfume",
            category_name: "Perfume",
            maincategory: "cosmetics"
        }
    ],
    new_arrival: [
        {
            productid: 401,
            title: "Modern T-Shirt",
            price: 24.99,
            discount: 39.99,
            imglink: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
            imgalt: "Modern T-Shirt",
            category_name: "T-Shirt",
            maincategory: "fashion"
        },
        {
            productid: 402,
            title: "Elegant Necklace",
            price: 79.99,
            discount: 109.99,
            imglink: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
            imgalt: "Elegant Necklace",
            category_name: "Necklace",
            maincategory: "jewellery"
        },
        {
            productid: 403,
            title: "Wireless Mouse",
            price: 29.99,
            discount: 49.99,
            imglink: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
            imgalt: "Wireless Mouse",
            category_name: "Mouse",
            maincategory: "electronics"
        },
        {
            productid: 404,
            title: "Casual Jacket",
            price: 69.99,
            discount: 99.99,
            imglink: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=200&h=200&fit=crop",
            imgalt: "Casual Jacket",
            category_name: "Jacket",
            maincategory: "fashion"
        }
    ]
};
const TrendSection = () => {
    const data = useRef<data>({trending:[],top_rated:[],new_arrival:[]});
    const [loading, setloading] = useState(true);
    async function sync(){
        // Use placeholder trending data as primary data source
        data.current = placeholderTrendingData;
        setloading(false);
        
        // Optionally try to fetch from API in background (commented out for now)
        // const res = await topDataHandler();
        // if (res.status === 200) {
        //   data.current = res.data.data;
        // }
    }
    useEffect(() => {
      sync();
    }, [])
    
  return (
    <div className='flex-wrap xl:w-[100%] w-auto flex justify-center'>
            <div className='sm:ml-4'>
                    <p className='border-b-[1px] font-semibold text-lg leading-[50px] '>New Arrivals</p>
                    <div className='flex max-w-[310px] overflow-x-auto snap-x snap-mandatory'>
                        <div className='snap-center relative'>
                        {loading && <div className='w-[310px] h-[450px]'>{loading && <div className='absolute left-0 right-8 top-20 z-50'><Loading/></div>}</div> }
                            <TrendingPrimary data={data.current.new_arrival.slice(0,4)} isSecondary={false}/>
                        </div>
                        <div className='snap-center relative'>
                        {loading && <div className='w-[310px] h-[450px]'>{loading && <div className='absolute left-0 right-8 top-20 z-50'><Loading/></div>}</div> }
                            <TrendingPrimary data={data.current.new_arrival.slice(4)} isSecondary={true}/>
                        </div>
                    </div>
            </div>
            <div className='sm:ml-4 font-semibold text-[18px]'>
                    <p className='border-b-[1px] leading-[50px] '>Trending</p>
                    <div className='flex max-w-[310px] overflow-x-auto snap-x snap-mandatory'>
                        <div className='snap-center relative'>
                        {loading && <div className='w-[310px] h-[450px]'>{loading && <div className='absolute left-0 right-8 top-20 z-50'><Loading/></div>}</div> }
                            <TrendingPrimary data={data.current.trending.slice(0,4)} isSecondary={false}/>
                        </div>
                        <div className='snap-center relative'>
                        {loading && <div className='w-[310px] h-[450px]'>{loading && <div className='absolute left-0 right-8 top-20 z-50'><Loading/></div>}</div> }
                            <TrendingPrimary data={data.current.trending.slice(4)} isSecondary={true}/>
                        </div>
                    </div>
            </div>
            <div className='sm:ml-4 font-semibold text-[18px]'>
                    <p className='border-b-[1px] leading-[50px] '>Top Rated</p>
                    <div className='flex max-w-[310px]  overflow-x-auto snap-x snap-mandatory'>
                        <div className='snap-center relative'>
                        {loading && <div className='w-[310px] h-[450px]'>{loading && <div className='absolute left-0 right-8 top-20 z-50'><Loading/></div>}</div> }
                            <TrendingPrimary data={data.current.top_rated.slice(0,4)} isSecondary={false}/>
                        </div>
                        <div className='snap-center relative'>
                            {loading && <div className='w-[310px] h-[450px]'>{loading && <div className='absolute left-0 right-8 top-20 z-50'><Loading/></div>}</div> }
                            <TrendingPrimary data={data.current.top_rated.slice(4)} isSecondary={true}/>
                        </div>
                    </div>
            </div>
        </div>
  )
}

export default TrendSection