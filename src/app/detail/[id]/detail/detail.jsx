"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getByID, clearDetail } from "@/redux/actions";

const Detail = () => {
  const dispatch = useDispatch();

  const Product = useSelector((state) => state.productDetail);
    const {id} = useParams()

    const loadIdProduct = () => {
        if(id === Product.id) return;
        else dispatch(getByID(id));
     }

     useEffect(() => {
      loadIdProduct()
     }, [])
     
     useEffect(()=>{
        console.log(Product)
     },[])
  return (
    <div className={styles.centrardiv}>
      <div className={styles.space}>

      {Product && (
        <div className={styles?.productdetail}>
          <div className={styles?.productinfo}>

        <h2 className={styles.productname}>{Product?.name}</h2>
        <h2>{Product?.brandName}</h2>
        <h2>{Product?.description}</h2>
        <h2>{`Price: $${Product.price}`}</h2>
        <h2>{Product?.color}</h2>
        <h2>{Product?.material}</h2>
          </div>
        <Image
        className={styles.image}
            src={Product?.image}
            width={600}
            height={600}
            alt={Product?.name || id}
            />
       </div>
         )
        }
        </div>
    </div>
  );
};

export default Detail;