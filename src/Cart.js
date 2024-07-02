import React from "react";
import styles from "./Cart.module.css";

function Cart({ cart, removeFromCart }) {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const borderBottom = {
    borderBottom: "3px solid lightgrey",
    backgroundColor: "#f3f3f3",
  };

  return (
    <div className={styles.cart}>
      <table>
        {/* <thead>
          <tr>
            <th>Item</th>
            <th>Drinks/Addons</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead> */}
        {cart.length === 0 ? (
          <tbody>
            <tr className={cart.length && styles.borderBottom}>
              <td>
                <p>Your cart is empty </p>
                {/* <p>Total: PHP {calculateTotalPrice()}</p> */}
                <p>cart Items: {cart.length}</p>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} style={cart.length > 0 ? borderBottom : ""}>
                <td>
                  <button onClick={() => removeFromCart(item)}>❌</button>
                </td>
                <td className={styles.mainItem}>
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + item.img}
                      alt={item.name}
                    />
                    <div>
                      <p>{item.foodName}</p>
                      <p>
                        <b>PHP {item.mainDishPrice}</b>
                      </p>
                    </div>
                  </div>
                </td>
                <td className={styles.drinksAddons}>
                  <div>
                    {!item.drinks ? (
                      "No Drinks"
                    ) : (
                      <>
                        <img
                          src={process.env.PUBLIC_URL + item.drinkImg}
                          alt={item.drinks}
                        />
                        {/* <p>{item.drinks}</p> */}
                        <p>FREE</p>
                      </>
                    )}
                  </div>

                  {item.totalAddons.map((adds, index2) => (
                    <React.Fragment key={index2}>
                      <div>
                        <img src={adds.img} alt={adds.value} width="100" />
                        <p>
                          <b>PHP {adds.price}</b>
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </td>
                <td>
                  <p>
                    <b>PHP {item.totalPrice}</b>
                  </p>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>
                <p>Total:</p>
              </td>
              <td>
                <p>
                  <b>PHP {calculateTotalPrice()}</b>
                </p>
                {/* <p>cart Items: {cart.length}</p> */}
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Cart;
