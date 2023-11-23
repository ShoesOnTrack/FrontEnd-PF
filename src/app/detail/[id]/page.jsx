"use client"
import { useParams } from "next/navigation";

const Detail = () => {

    const {id} = useParams()
  return (
    <div>
      <h1>Detalles del elemento {id}</h1>
      {/* Aquí puedes usar el ID para cargar los datos correspondientes */}
    </div>
  );
};

export default Detail;