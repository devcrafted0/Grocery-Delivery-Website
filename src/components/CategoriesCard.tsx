import Image from "next/image"
import Link from "next/link";

const CategoriesCard = ({image , text , bgColor , path} : {image : string; text : string; bgColor : string; path : string;}) => {
  return (
    <Link href={`/all-products/${path.toLocaleLowerCase()}`} className="group cursor-pointer py-3 px-3 gap-2 rounded-lg flex flex-col justify-center items-center" style={{
        backgroundColor : bgColor
    }}>
        <Image className="group-hover:scale-108 transition max-w-28" src={image} width={100} height={100} alt={text}/>
        <p className="text-sm font-medium">{text}</p>
    </Link>
  )
}

export default CategoriesCard