"use client"
import Link from "next/link";
import Cards from "@/components/cardsContainer/cards.jsx";
import Header from "@/components/header/header";
import Filters from "@/components/filters/Filters";
import { useEffect, useState } from "react";
import { dataAsArray } from "@/helpers/data";
import Image from "next/image";
import button from "@/helpers/assets/clockwise.svg"
import styles from "./Home.module.css";

const HomePage = () => {
  // const Page = useSelector((state) => state.indexProductShow);
  const [initialPageSet, setInitialPageSet] = useState(1);
  const [initialFilters, setInitialFilters] = useState({})

  const handleChange= (event)=>{
    const { name, value } = event.target;
    setInitialFilters({ ...initialFilters, [name]: value });
  }

  const handleFilterRemove = (filterName) => {
    const newInitialFilters = { ...initialFilters };
    delete newInitialFilters[filterName];
    setInitialFilters(newInitialFilters);
    // dispatch(getFiltersAndPagination(newInitialFilters, 1));
  };

  useEffect(()=>{
    console.log(initialFilters);
  },[handleChange])

  const marcasOpt = ["nike", "converse", "adidas", "topper"];
  const categoriaOpt = ["running", "deportivas", "casuals", "lujo"]
  const colorOpt = ["negro", "rojo", "azul", "amarillo", "rosa"]
  //ordenamiento
  const PriceOpt = ['highest', 'lowest'];
  return (
    <div className={styles?.home}>
      <Header/>
      <Filters
          name="marcas"
          options={marcasOpt}
          handleChange={handleChange}
          state={null}
          className={styles?.filters}
        />
        <Filters
          className={styles.filters}
          name="categorias"
          options={categoriaOpt}
          handleChange={handleChange}
          state={null}
        />
        <Filters
          //  className={styles.filters}
          name="color"
          options={colorOpt}
          handleChange={handleChange}
          state={null}
        />
        <Filters
          //  className={styles.filters}
          name="price"
          options={PriceOpt}
          handleChange={handleChange}
          state={null}
        />
        <button
          onClick={() => {
            setInitialPageSet(1); // Reiniciar a la página 1 cuando se hace clic en el botón de reset
            // dispatch(getFiltersAndPagination({}, 1));
            setInitialFilters({});
          }}
          className={styles?.button}
          >
          <Image
          className={styles?.reset}
                    src={button}
                    width={25}
                    height={25}
                    alt="Search"
                />
        </button>
        {initialFilters?.marcas && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('marcas')}>
            {initialFilters.marcas}
          </div>
        )}
        {initialFilters?.categorias && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('categorias')}>
            {initialFilters.categorias}
          </div>
        )}
        {initialFilters?.color && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('color')}>
            {initialFilters.color}
          </div>
        )}
        {initialFilters?.price && (
          <div className={styles['active-filter']} onClick={() => handleFilterRemove('price')}>
            {initialFilters.price}
          </div>
        )}
      <Cards shoes={dataAsArray}/>
       </div>
  );
};

export default HomePage;
