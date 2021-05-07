import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function MyBasket({ basket }) {
  return (
    <section className="MyBasket">
      <Loader type="Grid" color="#00BFFF" height={100} width={100} />
      <p>
        You have {basket.length} item{basket.length === 1 ? "" : "s"} in your basket.
      </p>
      <ul>
        {basket.map((item) => (
          <CartItem name={item.productdisplayname} amount={item.amount} key={item.id} />
        ))}
      </ul>
    </section>
  );
}

function CartItem(props) {
  console.log(props);
  return (
    <li>
      {props.amount} {props.name}
    </li>
  );
}
