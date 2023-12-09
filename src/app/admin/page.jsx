"use client";
import React from "react";
import { getFiltersAndPagination, getUserProducts } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoeList from "../../components/dashboard/ShoeList";
import { Navigate } from "react-router";
import Link from "next/link";

const ShoesPage = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.userProducts);
  const user = useSelector((state) => state.user);

  useEffect(()=>{
    if(!user?.isAdmin)

  },[])
  useEffect(() => {
    dispatch(getUserProducts());
  }, [shoes]);

  return (
    <div>
      <div>

      <h1>ADMIN: {user.name}</h1>
      </div>
      <ShoeList shoes={shoes} />
    </div>
  );
};

export default ShoesPage;
