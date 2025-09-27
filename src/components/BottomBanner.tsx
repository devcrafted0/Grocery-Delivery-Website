import { assets, features } from "@/assets/assets"
import Image from "next/image"

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
        <Image src={assets.bottom_banner_image} alt="banner" className="w-full hidden md:block" width={1100} height={1100}/>
        <Image src={assets.bottom_banner_image_sm} alt="banner" className="w-full md:hidden" width={1100} height={1100}/>

        <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
            <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Why We Are the Best?</h1>

                {features.map((f, i)=>(
                    <div key={i} className="flex items-center gap-4 mt-2">
                        <Image src={f.icon} alt={f.title} className="md:w-11 w-9" width={100} height={100}/>
                        <div>
                            <h3 className="text-lg md:text-xl font-semibold">{f.title}</h3>
                            <p className="text-gray-500/70 text-xs md:text-sm">{f.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BottomBanner