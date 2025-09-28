"use client";

import ProductsCard from "@/components/ProductsCard";
import { useAppContext } from "@/context/AppContext";
import { product } from "@/types";
import { useEffect, useState } from "react";
import { categories as Category } from "@/assets/assets";
import {redirect} from 'next/navigation'

const page = ({ params }: { params: { categories: string } }) => {
  const { categories } = params;
  const { products , searchQuery } = useAppContext();
  const [matchedProducts, setMatchedProducts] = useState<product[]>([]);

    if(searchQuery !== ''){
      redirect('/all-products');
    }

  useEffect(() => {
    setMatchedProducts(
      products.filter(
        (product) => product.category.toLowerCase() === categories.toLowerCase()
      )
    );
  }, [categories, products]);

  const currentCategory = Category.find(
    (category) => category.path.toLowerCase() === categories.toLowerCase()
  );

  return (
    <div className="mb-32 flex flex-col px-6">
      <div className="flex flex-col items-end w-max my-10">
        <p className="text-2xl font-medium uppercase">
          {currentCategory?.text.toUpperCase()}
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

    {matchedProducts.length > 0 ? <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(15rem,max-content))]">
        {matchedProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductsCard
              key={index}
              _id={product._id}
              name={product.name}
              image={product.image}
              category={product.category}
              rating={product.rating!}
              offerPrice={product.offerPrice}
              price={product.price}
            />
          ))}
      </div> : (
        <p>No Product Found...</p>
      )}
    </div>
  );
};

export default page;
