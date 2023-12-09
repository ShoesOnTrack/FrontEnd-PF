"use client";
import { getUserProducts } from "@/redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoeList from "../../components/dashboard/ShoeList";

const ShoesPage = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.userProducts);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.isAdmin)window.location.href = "/";
  }, [user]);

  useEffect(() => {
    dispatch(getUserProducts());
  }, [shoes]);

  return (
    <div>
      <div>
      <h2>ADMIN: {user?.name}</h2>
      <ShoeList shoes={shoes} />
      </div>
    </div>
  );
};

export default ShoesPage;
