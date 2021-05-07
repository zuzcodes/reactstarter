import MyBasket from "./MyBasket";
import CheckoutForm from "./CheckoutForm";

export default function Basket(props) {
  return (
    <aside className="Basket">
      <MyBasket basket={props.basket} />
      {props.basket.length > 0 ? <CheckoutForm /> : <p>Your basket is empty..</p>}
    </aside>
  );
}
