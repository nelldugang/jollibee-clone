import styles from "./Cart.module.css";

function Cart({ cart, removeFromCart }) {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className={styles.cart}>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.foodName} - ${item.price}
              <img src={process.env.PUBLIC_URL + item.img} alt={item.name} />
              {!item.drinks ? (
                "No Drinks"
              ) : (
                <>
                  <p>{item.drinks}</p>
                  <img
                    src={process.env.PUBLIC_URL + item.drinkImg}
                    alt={item.drinks}
                  />
                </>
              )}
              <p>
                {item.addons} {item.addons ? "$20" : ""}
              </p>
              <img
                src={process.env.PUBLIC_URL + item.addOnsImg}
                alt={item.addons}
              />
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total Price: ${calculateTotalPrice()}</p>
      <p>cart Items: {cart.length}</p>
    </div>
  );
}

export default Cart;
