"use client";
import Link from "next/link";
import style from "./shoe.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteShoe } from "@/redux/actions";

const Shoe = ({ id, name, brandName, description, price, color, image }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteShoe(id));
      // Si el dispatch de la acción se completa sin errores, significa que el zapato se eliminó correctamente
      window.alert("Successfully deleted shoe!");
    } catch (error) {
      window.alert(error.message); // Muestra el mensaje de error obtenido
    }
  };

  return (
    <div className={style.container}>
      {/* <div className={style.brand}>{brandName}</div> */}
      <div className={style.containerImg}>
        <img src={image} alt={name}></img>
      </div>
      <div className={style.details}>
        <span className={style.brandtitle}>{brandName}</span>
        <h4 className={style.name}>{name}</h4>
      </div>
      <div className={style.price}>{price}</div>
      <div>
        <button onClick={handleDelete}>DELETE</button>
        <Link href={`/admin/modify-shoe/${id}`}>
          <button>MODIFY</button>
        </Link>
      </div>
    </div>
  );
};

export default shoe;
