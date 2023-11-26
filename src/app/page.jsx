"use client"
import Link from "next/link";
import Cards from "@/components/cardsContainer/cards.jsx";
import Header from "@/components/header/header";
import Newsletter from "@/components/newsletter/Newsletter";
import Footer from "@/components/footer/Footer";
import { useEffect } from "react";
import { dataAsArray } from "@/helpers/data";


const HomePage = () => {


const LoginPage = () => {
  return (

    <div>
      <Header/>
      <Cards shoes={dataAsArray}/>
      <Newsletter/>
      <Footer />
       </div>

  );
};

export default LoginPage;
