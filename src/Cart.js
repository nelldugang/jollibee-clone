import styles from "./Cart.module.css";

function Cart({ cart, removeFromCart }) {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <div className={styles.cart}>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <img src={process.env.PUBLIC_URL + item.img} alt={item.name} />
              <p>{item.foodName}</p>
              {!item.drinks ? (
                "No Drinks"
              ) : (
                <>
                  <img
                    src={process.env.PUBLIC_URL + item.drinkImg}
                    alt={item.drinks}
                  />
                  <p>{item.drinks}</p>
                </>
              )}

              {/* <p>
                {item.addons} {item.addons ? item.addOnsPrice : ""}
              </p> */}
              {/* {item.addons ? (
                <img
                  src={process.env.PUBLIC_URL + item.addOnsImg}
                  alt={item.addons}
                />
              ) : (
                ""
              )} */}
              <div>
                {item.totalAddons.map((adds, index2) => (
                  <div key={index2}>
                    {/* {adds.value} */}
                    <img src={adds.img} alt={adds.value} width="100" />
                    <p>PHP {adds.price}</p>
                  </div>
                ))}
              </div>
              <p>${item.totalPrice}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: PHP {calculateTotalPrice()}</p>
      <p>cart Items: {cart.length}</p>
    </div>
  );
}

export default Cart;
