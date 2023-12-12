"use client"
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts, removeCartBack } from "@/redux/actions";

const Purchase = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const carrito = useSelector((state)=> state.carrito);

  const loadFavsCarts = ()=>{
    if(user?.id){
       dispatch(getAllCarts(user.id));
    }
   }

   const vaciarCarrito = async()=>{
      carrito?.map((cart)=>{
        console.log(cart.id)
        handleCarrito(cart.id)
      })
   }

   const handleCarrito = async(id) => {
    console.log("llegue aca")
    await dispatch(removeCartBack({ UserId: user.id, ProductId: id }));
  };

  useEffect(() => {
    loadFavsCarts();
  }, []);

  useEffect(()=>{
    console.log(user, carrito)
    vaciarCarrito()
  },[carrito])

  return (
      <div>
        <h2>GRACIAS POR TU COMPRA!</h2>
        <Link href="/">Home</Link>
      </div>
  );
};

export default Purchase;