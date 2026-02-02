import React, { useLayoutEffect, useRef, useState } from 'react';
import Quickview from './ProductUi/Quickview';
import Stars from './ProductUi/Stars';
import NoProduct from './Search/NoProduct';
import Loading from './Loading';
import Link from 'next/link';
import { homeProductsDataHandler } from '@/app/api/homeData';
interface Color {
  colorid:number;
  name: string;
  colorname: string;
  colorclass: string;
}

interface Size {
  sizeid:number;
  name: string;
  sizename:string;
  instock: boolean;
}
interface ProductImage {
  imageid: number;
  imglink: string;
  imgalt: string;
}

// Interface for products
interface Product {
  productid: number;
  title: string;
  category: string;
  maincategory:string;
  price: string;
  discount: string;
  stars: number;
  isnew: boolean;
  issale: boolean;
  isdiscount: boolean;
  colors: Color[]; // assuming colors is an array of strings
  sizes: Size[];  // assuming sizes is an array of strings
  reviewCount: number;
  images: ProductImage;
}
const defaultProduct: Product = {
  productid: 0,
  title: "",
  category: "",
  maincategory:'',
  price: "0.00",
  discount: "0.00",
  stars: 0,
  isnew: false,
  issale: false,
  isdiscount: false,
  colors: [],
  sizes: [],
  reviewCount: 0,
  images: {
      imageid: 0,
      imglink: "",
      imgalt: ""
  }
};

// Placeholder products to show when API fails
const placeholderProducts: Product[] = [
  {
    productid: 1,
    title: "Classic Cotton T-Shirt",
    category: "T-Shirt",
    maincategory: "fashion",
    price: "29.99",
    discount: "19.99",
    stars: 4,
    isnew: true,
    issale: false,
    isdiscount: true,
    colors: [],
    sizes: [],
    reviewCount: 24,
    images: {
      imageid: 1,
      imglink: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      imgalt: "Classic Cotton T-Shirt"
    }
  },
  {
    productid: 2,
    title: "Denim Jacket",
    category: "Jacket",
    maincategory: "fashion",
    price: "89.99",
    discount: "69.99",
    stars: 5,
    isnew: false,
    issale: true,
    isdiscount: true,
    colors: [],
    sizes: [],
    reviewCount: 18,
    images: {
      imageid: 2,
      imglink: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
      imgalt: "Denim Jacket"
    }
  },
  {
    productid: 3,
    title: "Running Sneakers",
    category: "Sport",
    maincategory: "footwear",
    price: "129.99",
    discount: "99.99",
    stars: 4,
    isnew: false,
    issale: false,
    isdiscount: true,
    colors: [],
    sizes: [],
    reviewCount: 42,
    images: {
      imageid: 3,
      imglink: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      imgalt: "Running Sneakers"
    }
  },
  {
    productid: 4,
    title: "Gold Necklace",
    category: "Necklace",
    maincategory: "jewellery",
    price: "199.99",
    discount: "149.99",
    stars: 5,
    isnew: true,
    issale: false,
    isdiscount: true,
    colors: [],
    sizes: [],
    reviewCount: 12,
    images: {
      imageid: 4,
      imglink: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop",
      imgalt: "Gold Necklace"
    }
  },
  {
    productid: 5,
    title: "Wireless Headphones",
    category: "Headphone",
    maincategory: "electronics",
    price: "159.99",
    discount: "119.99",
    stars: 4,
    isnew: false,
    issale: true,
    isdiscount: true,
    colors: [],
    sizes: [],
    reviewCount: 67,
    images: {
      imageid: 5,
      imglink: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      imgalt: "Wireless Headphones"
    }
  },
  {
    productid: 6,
    title: "Floral Perfume",
    category: "Perfume",
    maincategory: "cosmetics",
    price: "79.99",
    discount: "59.99",
    stars: 4,
    isnew: false,
    issale: false,
    isdiscount: true,
    colors: [],
    sizes: [],
    reviewCount: 31,
    images: {
      imageid: 6,
      imglink: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
      imgalt: "Floral Perfume"
    }
  }
];
const ProductCard = ({ product }:{ product:Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [productData, setproductData] = useState(defaultProduct);
  const [open, setOpen] = useState(false);
  function categoryLink(maincategory:string,category:string){
    const splitCat = category.split(' ').join('-');
    return `/sub-category/${maincategory}/${splitCat}`
  }
  return (
    <div
      className='relative flex flex-col border-[1px] rounded-xl lg:max-h-[400px] sm:max-w-[220px] p-1 overflow-hidden transition-shadow duration-300 hover:shadow-lg'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Quickview open={open} setOpen={setOpen} product={productData} />
      {product.issale && (
        <div className="absolute top-2 -left-8 bg-black text-white px-10 py-1 z-10 rotate-[320deg] text-[12px] uppercase rounded">
          SALE
        </div>
      )}
      {product.isnew && (
        <div className="absolute top-2 -left-8 bg-salmon text-white px-10 py-1 z-10 rotate-[320deg] text-[12px] uppercase rounded">
          New
        </div>
      )}
      {product.isdiscount && (
        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 text-md uppercase rounded">
          {product.discount}%
        </div>
      )}
      <div className={`relative transition-transform mb-1 duration-300 ${isHovered && 'scale-105'}`}>
        <img className='min-w-[200px] min-h-[210px]' src={product.images.imglink} alt={product.title} />
        {isHovered && (
          <button
            className='absolute bottom-2 left-1/2 rounded-xl transform -translate-x-1/2 w-[100px] h-[30px] flex items-center justify-center bg-black bg-opacity-50 text-white text-sm uppercase transition-opacity duration-300'
            onClick={() => {setOpen(true);setproductData(product)}}>
            Quickview
          </button>
        )}
      </div>
      <div className='pl-4 pr-4 flex flex-col gap-2'>
        <Link href={categoryLink(product.maincategory,product.category)}><p className='text-[14px] text-salmon'>{product.category}</p></Link>
        <Link href={`/product/${product.productid}`}><p className='tracking-[1px] text-silver hover:text-davysilver'>{product.title}</p></Link>
        <div className='flex items-center gap-2'>
          <Stars stars={product.stars}/>
          {product.reviewCount > 0 && <p className=' text-silver'>{product.reviewCount}</p>}
        </div>
        <div className='flex mb-5 items-center gap-4'>
          <p className='font-bold text-[18px]'>${product.discount}</p>
          <p className='line-through'>${product.price}</p>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const dataChecked = useRef(false);
  const products = useRef<Product[]>([]);
  const [loading, setloading] = useState(true);
  async function sync(){
    // Use placeholder products as primary data source
    products.current = placeholderProducts;
    dataChecked.current = true;
    setloading(false);
    
    // Optionally try to fetch from API in background (commented out for now)
    // const res = await homeProductsDataHandler();
    // if (res.status === 200) {
    //   products.current = res.data.data;
    // }
  }
  useLayoutEffect(() => {
    sync();
  }, [])
  return (
    <div className='sm:ml-4 ml-auto mr-auto pb-8 max-w-[980px] flex flex-col flex-1'>
      <p className='border-b-[1px] leading-[40px] tracking-wide font-semibold text-lg'>Products</p>
      <div className='flex flex-wrap mt-8 gap-5 justify-center xl:w-[980px] lg:w-[720px] max-w-[980px] flex-1 relative'>
      {loading && <div className='w-full h-[300px]'>{loading && <div className='absolute left-0 right-0 top-0 z-50'><Loading/></div>}</div> }
        {(dataChecked.current && products.current.length === 0) && <NoProduct/>}
        {dataChecked.current && products.current.map((each, index) => (
          <ProductCard key={index} product={each} />
        ))}
      </div>
    </div>
  );
}

export default Products;