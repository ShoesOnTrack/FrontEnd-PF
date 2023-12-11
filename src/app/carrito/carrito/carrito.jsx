"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCarts,removeCartBack } from "@/redux/actions";

import NavBar from "@/components/navbar/Navbar";
import Link from "next/link";

import styles from "../carrito/carrito.module.css"


const Carrito = () => {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const carts = useSelector((state) => state.carrito);
    const user = useSelector((state) => state.user);

    const loadCarts = ()=>{
        if(user?.id && (refresh || !carts.length)){
            dispatch(getAllCarts(user.id));
            setRefresh(false);
        }
    }
    useEffect(() => {
        loadCarts()
      }, [carts, refresh]);

      const handleCarrito = async(id) => {
        await dispatch(removeCartBack({ UserId: user.id, ProductId: id }));
        setRefresh(true); 
      };

      useEffect(()=>{
        console.log(carts)
      },[carts])


    return(
        <div>
        <NavBar user={user}/>
      
        {carts?.length > 0 ? (
        <>
          <h1>Carrito de Compras</h1>
          <div className={styles.container}>
            {carts.map((car) => (
              <div key={car.id}>
                <button onClick={() => handleCarrito(car.id)}>
                </button>
                <Link href={`/detail/${car.id}`}>
                  <div>
                  <img src={car.image} alt={car.name}></img>
                  <div>{car.name}</div>
                  <div><h4 >{car.price}</h4></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>

          <p>...</p>
       
        </div>
      )}
        
    </div>
    );
};

export default Carrito;