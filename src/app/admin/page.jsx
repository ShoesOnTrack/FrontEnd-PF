"use client";

import React from "react";
import { getFiltersAndPagination, getUserProducts } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoeList from "../../components/dashboard/ShoeList";

const ShoesPage = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.userProducts);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProducts());
  }, [shoes]);

  console.log(shoes);

  return (
    <div>
      <h1>ADMIN: {user.name}</h1>
      <ShoeList shoes={shoes} />
    </div>
  );
};

export default ShoesPage;
