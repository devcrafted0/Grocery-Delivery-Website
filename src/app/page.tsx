import { categories } from "@/assets/assets";
import CategoriesCard from "@/components/CategoriesCard";
import MainBanner from "@/components/MainBanner";

const page = () => {
  return (
    <div className="mt-10 px-6 md:px-16 lg:px-24 xl:px-32">
      <MainBanner />
      
      {/* Categories */}
      <div className="mt-16">
        <p className="text-2xl md:text-3xl font-medium">Categories</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
          {categories.map((c , i)=>(
            <CategoriesCard key={i} image={c.image} text={c.text} bgColor={c.bgColor} path={c.path}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page;