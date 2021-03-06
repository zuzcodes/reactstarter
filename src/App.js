import { useState, useEffect, useRef } from "react";
import "./App.css";
import Nav from "./Nav";
import ProductList from "./ProductList";
import Basket from "./Basket";
import { perPage } from "./config";

function App() {
  const myEl = useRef(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("Search");
  const [basket, setBasket] = useState([]);
  const [sortKey, setSortKey] = useState("price");
  const [start, setStart] = useState(0);

  useEffect(() => {
    fetch(`https://kea-alt-del.dk/t7/api/products?limit=${perPage}&start=${start}`)
      .then((res) => res.json())
      .then(setProducts);
  }, [start]);

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

  function updateStart() {
    setStart((prevState) => prevState + perPage);
  }

  return (
    <div className="App">
      <div>
        <h1>Searching for {search}</h1>
        <input
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button ref={myEl} onClick={updateStart}>
          Next
        </button>
        <button onClick={() => addToBasket({ data: true })}>Test</button>
        <button onClick={() => setSortKey("productdisplayname")}>
          Sort By Name
        </button>
        <button onClick={() => setSortKey("price")}>Sort By Price</button>
      </div>
      <Nav />
      <ProductList product={copy} addToBasket={addToBasket} />
      <Basket basket={basket} />
    </div>
  );
}

export default App;
