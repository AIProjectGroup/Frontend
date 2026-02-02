import React, { useLayoutEffect, useRef, useState } from 'react'
import DealTime from './DealTime';
import ProgressBar from './ProgressBar';
import Stars from './ProductUi/Stars';
import { dealDataHandler } from '@/app/api/homeData';
import Link from 'next/link';
import Loading from './Loading';
interface DealProduct {
    productid: number;
    title: string;
    stars: number;
    description: string;
    price: number;
    discount: number;
    sold: number;
    available: number;
    rating: number;
    imglink: string;
    imgalt: string;
    end_time:string;
}

// Placeholder deal products to show when API fails
const placeholderDeals: DealProduct[] = [
  {
    productid: 101,
    title: "Premium Wireless Bluetooth Headphones",
    stars: 5,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    price: 89.99,
    discount: 149.99,
    sold: 45,
    available: 100,
    rating: 4.8,
    imglink: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    imgalt: "Premium Wireless Bluetooth Headphones",
    end_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
  },
  {
    productid: 102,
    title: "Smart Fitness Watch with Heart Rate Monitor",
    stars: 4,
    description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone connectivity. Track your health and fitness goals.",
    price: 199.99,
    discount: 299.99,
    sold: 23,
    available: 75,
    rating: 4.6,
    imglink: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    imgalt: "Smart Fitness Watch",
    end_time: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString() // 18 hours from now
  }
];
const Deal = () => {
    const data = useRef<DealProduct[]>([]);
    const [loading, setloading] = useState(true);
    async function sync(){
        // Use placeholder deals as primary data source
        data.current = placeholderDeals;
        setloading(false);
        
        // Optionally try to fetch from API in background (commented out for now)
        // const res = await dealDataHandler();
        // if (res.status === 200) {
        //   data.current = res.deals.data;
        // }
    }
    useLayoutEffect(() => {
      sync();
    }, [])
  return (
    
    <div className=' mt-10 sm:ml-4 ml-auto mr-auto max-w-[350px] md:max-w-[800px] xl:max-w-[1000px] flex flex-col justify-center'>
        <p className='border-b-[1px] leading-[50px] tracking-[1.5px] font-semibold text-[18px]'> Deal of The Day</p>
        <div className='p-[30px] border-[1px] mt-8 rounded-xl overflow-auto snap-x snap-proximity flex gap-20 relative'>
        {loading && <div className='w-screen h-[350px]'>{loading && <div className='absolute left-0 right-0 top-16 z-50'><Loading/></div>}</div> }
            {data.current.map((each,index)=><div key={index} className='flex flex-col rounded-xl min-w-full gap-5 h-auto items-center lg:pl-10 snap-center lg:flex-row'>
                <a href={`/product/${each.productid}`}><img className='max-w-[450px] min-w-[200px] rounded-md' alt={each.imgalt} src={each.imglink}/></a>
                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex items-center gap-2'>
                        <Stars stars={each.stars}/>
                        {each.rating > 0 && <p className='text-sm text-silver'>{each.rating}</p>}
                    </div>
                    <a href={`/product/${each.productid}`}>
                        <p className='text-base font-bold w-full'>{each.title}</p>
                    </a>
                    <p className='text-base tracking-normal text-silver'>{each.description}</p>
                    <div className='flex items-center'>
                        <p className='text-2xl font-bold text-salmon'>${each.price}</p>
                        <p className='text-xl line-through ml-4 text-silver'>${each.discount}</p>
                    </div>
                    <Link href={`/product/${each.productid}`}><button className='bg-salmon p-2 rounded-xl w-[165px] h-[45px] text-white font-bold text-lg hover:bg-black hover:text-white transition-colors duration-200'>Visit Product</button></Link>
                    <div className='flex justify-between'>
                        <p className='text-sm'>ALREADY SOLD: <span className='font-bold'>{each.sold}</span></p>
                        <p className='text-sm'>AVAILABLE: <span className='font-bold'>{each.available}</span></p>
                    </div>
                    <ProgressBar sold={each.sold} total={each.available}/>
                    <p className='text-sm font-semibold'>HURRY UP! OFFER ENDS IN:</p>
                    <DealTime endTime={each.end_time}/>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default Deal