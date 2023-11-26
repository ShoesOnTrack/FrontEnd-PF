"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { dataAsArray } from "@/helpers/data";
import styles from "./detail.module.css";

const Detail = () => {
  const [Product, setProduct] = useState();
  const { id } = useParams();

  const loadIdProduct = () => {
    console.log(dataAsArray);
    const filtrado = dataAsArray?.filter((shoe) => id == shoe.id);
    setProduct(filtrado[0]);
  };

  useEffect(() => {
    loadIdProduct();
  }, []);

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
              alt={Product?.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
