import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./Nav";
import ProductList from "./ProductList";
import Basket from "./Basket";

function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [sortKey, setSortKey] = useState("price");

  useEffect(() => {
    fetch("https://kea-alt-del.dk/t7/api/products?limit=50")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  function addToBasket(payload) {
    const inBasket = basket.findIndex((item) => item.id === payload.id);
    if (inBasket === -1) {
      //add amount
      const nextPayload = { ...payload };
      nextPayload.amount = 1;
      setBasket((prevState) => [...prevState, nextPayload]);
    } else {
      //item already exists in the basket - modify the amount
      const nextBasket = basket.map((item) => {
        if (item.id === payload.id) {
          item.amount += 1;
        }
        return item;
      });
      setBasket(nextBasket);
    }
  }

  const copy = [...products];
  copy.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return -1;
    }
    if (a[sortKey] > b[sortKey]) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });

  return (
    <div className="App">
      <button onClick={() => addToBasket({ data: true })}>Test</button>
      <button onClick={() => setSortKey("productdisplayname")}>Sort By Name</button>
      <button onClick={() => setSortKey("price")}>Sort By Price</button>
      <Nav />
      <ProductList product={copy} addToBasket={addToBasket} />
      <Basket basket={basket} />
    </div>
  );
}

export default App;
