import Link from "next/link";
import Image from "next/image";

const Card = ({id, name, brandName, description , price, color, image}) => {
    return (
        <div>
            <Link href={`/detail/${id}`}>
            <h2>{name}</h2>
            <Image
            src={image}
            width={350}
            height={350}
            alt={name}
            />
            <h2>{brandName}</h2>
            <h2>{description}</h2>
            <h2>{price}</h2>
            <h2>{color}</h2>

            <br />
            </Link>
        </div>
    );
  };
  
  export default Card;