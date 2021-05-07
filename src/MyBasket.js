export default function MyBasket({ basket }) {
  return (
    <section className="MyBasket">
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
