import { useState } from "react";
export default function Product(props) {
  const [amount, setAmount] = useState(0);

  /*function handleClickUp(evt) {
   setAmount((prevState) => {
     return prevState + 1;
  });
  }*/

  function handleClickDown(evt) {
    setAmount((prevState) => {
      return prevState - 1;
    });
  }

  return (
    <article className={props.soldOut ? "Product soldout" : "Product"}>
      <h3>{props.productdisplayname}</h3>
      <p>{props.price}</p>
      <button disabled={amount === 0} onClick={handleClickDown}>
        {" "}
        -{" "}
      </button>
      {amount}
      <button onClick={() => props.addToBasket(props)}> + </button>
    </article>
  );
}
