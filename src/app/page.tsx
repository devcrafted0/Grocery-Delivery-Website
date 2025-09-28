'use client';
import { categories } from "@/assets/assets";
import BottomBanner from "@/components/BottomBanner";
import CategoriesCard from "@/components/CategoriesCard";
import MainBanner from "@/components/MainBanner";
import NewsLetter from "@/components/NewsLetter";
import ProductsCard from "@/components/ProductsCard";
import { useAppContext } from "@/context/AppContext";
import {redirect} from 'next/navigation'

const page = () => {
  const {products, searchQuery, setSearchQuery} = useAppContext();


  if(searchQuery !== ''){
    redirect('/all-products');
  }

  return (
    <div className="mt-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <MainBanner />
      
      {/* Categories */}
      <div className="my-16">
        <p className="text-2xl md:text-3xl font-medium">Categories</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
          {categories.map((c , i)=>(
            <CategoriesCard key={i} image={c.image} text={c.text} bgColor={c.bgColor} path={c.path}/>
          ))}
        </div>
      </div>

      {/* Best Sellers */}

      <div className="my-16">
        <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
        
        <div className="mt-6">
          <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
            {products.filter((p)=>p.inStock).slice(0,5).map((p)=>(
              <ProductsCard key={p._id} _id={p._id} name={p.name} category={p.category} price={p.price} offerPrice={p.offerPrice} image={p.image} rating={4}/>
            ))}
          </div>
        </div>
      </div>

      <BottomBanner/>
      <NewsLetter/>
    </div>
  )
}

export default page;