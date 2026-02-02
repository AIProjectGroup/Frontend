import React, { useLayoutEffect, useRef, useState } from 'react';
import { bannerDataHandler } from '@/app/api/homeData';
import Loading from './Loading';
interface Banner {
  bannerid: number;
  toptitle: string;
  middletitle: string;
  bottomtitle: string;
  imglink: string;
  startprice: number;
  buttontitle: string;
  redirect_link: string;
  createdat: Date;
  updatedat: Date;
}

// Placeholder banners to show when API fails
const placeholderBanners: Banner[] = [
  {
    bannerid: 1,
    toptitle: "Summer Sale",
    middletitle: "Fashion Collection",
    bottomtitle: "Starting from $",
    imglink: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    startprice: 25,
    buttontitle: "Shop Now",
    redirect_link: "/categories/fashion",
    createdat: new Date(),
    updatedat: new Date()
  },
  {
    bannerid: 2,
    toptitle: "New Arrivals",
    middletitle: "Electronics",
    bottomtitle: "Starting from $",
    imglink: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop",
    startprice: 99,
    buttontitle: "Explore",
    redirect_link: "/categories/electronics",
    createdat: new Date(),
    updatedat: new Date()
  },
  {
    bannerid: 3,
    toptitle: "Special Offer",
    middletitle: "Footwear",
    bottomtitle: "Starting from $",
    imglink: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=400&fit=crop",
    startprice: 49,
    buttontitle: "Buy Now",
    redirect_link: "/categories/footwear",
    createdat: new Date(),
    updatedat: new Date()
  }
];
const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = useRef<Banner[]>([]);
  const [loading, setloading] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.current.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.current.length) % data.current.length);
  };
  async function sync(){
    // Use placeholder banners as primary data source
    data.current = placeholderBanners;
    setloading(false);
    
    // Optionally try to fetch from API in background (commented out for now)
    // const res = await bannerDataHandler();
    // if (res.status === 200) {
    //   data.current = res.banners.data;
    // }
  }
  useLayoutEffect(() => {
    sync();
  }, [])
  return (
    <div className='relative flex flex-col items-center mt-4'>
      <div className='relative max-w-[1300px] overflow-hidden'>
        <div
          className='flex transition-transform duration-500 relative'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {loading && <div className='w-screen h-[300px]'>{loading && <div className='absolute left-0 right-0 z-50'><Loading/></div>}</div> }
          {data.current.map((each, index) => (
            <div key={index} className='flex-shrink-0 w-full'>
              <div className='relative'>
                <img
                  className='max-h-[450px] z-10 rounded-xl object-cover w-full'
                  src={each.imglink}
                  alt={`Slide ${index + 1}`}
                />
                <div className='absolute z-[15] md:hidden left-14 bottom-0 top-0 mt-auto mb-auto bg-white w-[320px] h-[220px] sm:w-[520px] sm:h-[220px] opacity-50 rounded-xl'></div>
                <div className='absolute z-20 w-[300px] h-[200px] md:h-auto sm:w-[500px] flex flex-col gap-0 md:gap-4 md:left-32 left-16 bottom-0 top-0 mt-auto mb-auto justify-center'>
                  <p className='text-salmon lg:text-3xl text-2xl font-medium'>{each.toptitle}</p>
                  <p className='sm:text-5xl text-2xl font-bold'>{each.middletitle}</p>
                  <p className='sm:text-2xl text-xl font-medium text-silver'>
                    {each.bottomtitle}{' '}
                    <span className='lg:text-4xl font-bold'>{each.startprice}</span>
                  </p>
                  <button className='sm:p-2 p-1 bg-salmon text-white px-5 sm:w-[130px] w-[120px] text-sm sm:text-base rounded-md font-semibold'>
                    {each.buttontitle}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded focus:outline-none'
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded focus:outline-none'
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Banner;
