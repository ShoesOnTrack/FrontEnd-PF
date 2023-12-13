"use client";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { getAllCarts,removeCartBack } from "@/redux/actions";

import NavBar from "@/components/navbar/Navbar";
import Link from "next/link";

import styles from "../carrito/carrito.module.css"


const Carrito = () => {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [client, setClient] = useState(false);
    const carts = useSelector((state) => state.carrito);
    const user = useSelector((state) => state.user);

    const loadCarts = ()=>{
        if(user?.id && (refresh || !client)){
            dispatch(getAllCarts(user.id));
            setRefresh(false);
            setClient(true);
        }
    }
    useEffect(() => {
        loadCarts()
        calcularTotal()
      }, [carts, refresh]);

      const handleCarrito = async(id) => {
        await dispatch(removeCartBack({ UserId: user.id, ProductId: id }));
        setRefresh(true); 
      };

      const calcularTotal = () => {
        let total = 0;
        carts.forEach((car) => {
          total += car.price; 
        });
        setTotalPrice(total); 
      };

      const handleClick = async () => {
        if (!user?.email) {
          setModalVisible(true);
          return;
        }
      
        const response = await fetch("http://localhost:3001/payment/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalPrice: totalPrice,
            userEmail: user.email, // Pasa el correo electrónico al backend
          }),
        });

        const data = await response.json();
        console.log(data);
      
        window.location.href = data.links[1].href;
      };

      useEffect(()=>{
        console.log(carts)
        console.log(totalPrice)
      },[carts, calcularTotal, refresh])


      return(
        <div >
          <NavBar user={user}/>
      
        {carts?.length > 0 ? (
        <>
          <h1>Carrito de Compras</h1>
          <div >
            {carts.map((car) => (
              <div key={car.id}>

                <div className={styles.container}>
                 <div><Link href={`/detail/${car.id}`}><img className={styles.imagen} src={car.image} alt={car.name}></img></Link></div>
                 <div>{car.brandName}</div>
                 <div>{car.name}</div>
                 <div>${car.price}</div>
                 <div><button onClick={() => handleCarrito(car.id)}>X</button></div>
                </div>

              </div>
            ))}
            <br />
            <div className={styles.pay}>
              <h2>TOTAL: ${totalPrice}</h2>
              <br/>
              <button onClick={handleClick}>Comprar</button>
            </div>
         </div>

        </>
      ) : (
        <div>

          <p>EMPTY</p>
       
        </div>
      )}
        
    </div>
    );
};

export default Carrito;