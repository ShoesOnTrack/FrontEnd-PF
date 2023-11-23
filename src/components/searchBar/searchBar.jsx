"use client"
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce'
import lupa from "@/helpers/assets/Lupa.png"
import Image from 'next/image';

const SearchBar = () => {
    const [name, setName] = useState("");

    const handleChange = (event) => {
      setName(event.target.value);
      handleSearch()
    };
  
    const handleSearch = useDebouncedCallback(() => {
      console.log(name);
    }, 300);

    return (
        <div>
            
      <input
        type="search"
        onChange={handleChange}
        value={name}
        placeholder="Search for a product..."
      />
      <button onClick={()=> setName("")}>
      <Image
       src={lupa}
       width={15}
       height={15}
        alt="Search" />
      </button>
        </div>
    );
  };
  
  export default SearchBar;