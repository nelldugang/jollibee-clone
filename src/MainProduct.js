import { useState } from "react";
import styles from "./MainProduct.module.css";

export default function MainProduct({
  selectedProduct,
  products,
  addToCart,
  goBackToFilter,
}) {
  const [drinks, setDrinks] = useState({});
  const [addOns, setAddons] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const addtoPrice = addOns
      ? selectedProduct.price + 20
      : selectedProduct.price;
    const cart = {
      id,
      foodName: selectedProduct.foodName,
      img: selectedProduct.img,
      drinks: drinks.val,
      price: addtoPrice,
      addons: addOns.val,
      addOnsImg: addOns.img,
      drinkImg: drinks.img,
    };
    addToCart(cart);
    goBackToFilter();
  };
  return (
    <form onSubmit={handleSubmit} className={styles.mainProduct}>
      <div>
        <p>Price: {selectedProduct.price}</p>
        <img
          src={process.env.PUBLIC_URL + selectedProduct.img}
          alt={selectedProduct.name}
        />
      </div>
      <div>
        {/* {selectedProduct.drink === "Yes" ? <p>Drinks:</p> : <></>} */}
        {products.drinks?.map(
          (drink, index) =>
            selectedProduct.drink === "Yes" && (
              <label key={index}>
                <input
                  name="drinks"
                  type="radio"
                  value={drink.drinkName}
                  onChange={(e) =>
                    setDrinks({ val: e.target.value, img: drink.drinkImg })
                  }
                />
                {drink.drinkName}
                <img
                  src={process.env.PUBLIC_URL + drink.drinkImg}
                  alt={selectedProduct.name}
                />
              </label>
            )
        )}
      </div>
      <div>
        <p>Add-Ons:</p>
        {products.addOns?.map((addon, index) => (
          <label key={index}>
            <input
              name="addons"
              type="radio"
              value={addon.addOnsName}
              onChange={(e) =>
                setAddons({ val: e.target.value, img: addon.addOnsImg })
              }
            />
            {addon.addOnsName}
            <img
              src={process.env.PUBLIC_URL + addon.addOnsImg}
              alt={selectedProduct.name}
            />
          </label>
        ))}
      </div>
      <br />
      <div>
        <button type="submit">Add to Cart</button>
        <button onClick={() => goBackToFilter()}>back</button>
      </div>
    </form>
  );
}
