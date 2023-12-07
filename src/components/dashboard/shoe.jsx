"use client";
import Link from "next/link";
import style from "./shoe.module.css"

const shoe = ({ id, name, brandName, description , price, color, image }) => {
  return (
    <div className={style.container} >     
    {/* <div className={style.brand}>{brandName}</div> */}
    <div className={style.containerImg}>
        <Link href={`/admin/modify-shoe/${id}`}>
            <img src={image} alt={name}></img> </Link>
    </div>
    <div className={style.details}>
        <span className={style.brandtitle} >{brandName}</span>
        <h4 className={style.name}>{name}</h4>
      
    </div>
        <div className={style.price}>{price}</div>
 </div>
  );
};

export default shoe;
