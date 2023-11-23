import { useEffect } from "react";
import Card from "../card/card";

const Cards = ({shoes}) => {
    useEffect(()=>{
        console.log(shoes)
    },[])
    return (
        <div>
            {shoes?.map(shoe=>{
                return <Card
                key={shoe.id}
                id={shoe.id}
                name={shoe.name}
                brandName={shoe.brandName}
                description={shoe.description}
                price={`$${shoe.price}`}
                image={shoe.image}
                stock={shoe.stock}
                color={shoe.color}
                status={shoe.status}/>
            })}
        </div>
    );
  };
  
  export default Cards;