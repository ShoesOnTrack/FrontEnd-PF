"use client"
import Link from "next/link";
import Cards from "@/components/cardsContainer/cards.jsx";
import SearchBar from "@/components/searchBar/searchBar";
import { useEffect } from "react";
import { dataAsArray } from "@/helpers/data";

const HomePage = () => {

  return (
    <div>
      <SearchBar/>
      <Cards shoes={dataAsArray}/>
       </div>
  );
};

export default HomePage;
