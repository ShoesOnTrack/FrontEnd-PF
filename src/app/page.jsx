import Link from "next/link";
import Cards from "@/components/cardsContainer/cards.jsx";
import SearchBar from "@/components/searchBar/searchBar";

const HomePage = () => {
  return (
    <div>
      <SearchBar/>
      <h2>Soy el componente Home</h2>
      <Cards/>
       </div>
  );
};

export default HomePage;
