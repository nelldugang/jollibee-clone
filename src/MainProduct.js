import { useState } from "react";
import styles from "./MainProduct.module.css";

export default function MainProduct({
  selectedProduct,
  products,
  addToCart,
  goBackToFilter,
}) {
  const [drinks, setDrinks] = useState({});
  const [addOns, setAddons] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [highlightedIndex2, setHighlightedIndex2] = useState([]);

  const handleHighlight = (index) => {
    setHighlightedIndex(index);
  };

  const highlighted = {
    backgroundColor: "#ffd6d6",
    // borderRadius: "40px",
    background:
      "radial-gradient(circle, rgba(247,0,0,1) 1%, rgba(237,45,22,0) 56%)",
  };

  const noHighlight = {
    backgroundColor: "none",
  };

  const highlightedLight2 = (index) => {
    // Check if the index is already in the highlightedIndices array
    const indexInHighlighted = highlightedIndex2.indexOf(index);

    if (indexInHighlighted === -1) {
      // If index is not already highlighted, add it to the array
      setHighlightedIndex2([...highlightedIndex2, index]);
    } else {
      // If index is already highlighted, remove it from the array
      const newHighlightedIndices = [...highlightedIndex2];
      newHighlightedIndices.splice(indexInHighlighted, 1);
      setHighlightedIndex2(newHighlightedIndices);
    }
  };

  const handleCheckboxChangeAndToggle = (event, index) => {
    handleCheckboxChange(event);
    highlightedLight2(index);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked, dataset } = event.target;
    if (checked) {
      setAddons((prev) => [
        ...prev,
        { value, img: dataset.img, price: Number(dataset.price) },
      ]);
    } else {
      setAddons((prev) => prev.filter((item) => item.value !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Using map to transform data into an object
    const totals = addOns.reduce((acc, item) => {
      acc.totalValue = (acc.totalValue || 0) + item.price;
      return acc;
    }, {});

    const id = crypto.randomUUID();
    const addtoPrice = addOns
      ? selectedProduct.price + (totals.totalValue ? totals.totalValue : 0)
      : selectedProduct.price;
    const cart = {
      id,
      foodName: selectedProduct.foodName,
      img: selectedProduct.img,
      mainDishPrice: selectedProduct.price,
      drinks: drinks.val,
      pricePerCart: totals,
      totalPrice: addtoPrice,
      totalAddons: addOns,
      drinkImg: drinks.img,
    };
    addToCart(cart);
    goBackToFilter();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.mainProduct}>
        <div>
          <img
            src={process.env.PUBLIC_URL + selectedProduct.img}
            alt={selectedProduct.foodName}
          />
        </div>
        <div>
          <p className={styles.nameStyle}>{selectedProduct.foodName}</p>
          <p>PHP{selectedProduct.price}</p>
          <p>{selectedProduct.description}</p>
        </div>
      </div>
      <div className={styles.drinks}>
        {/* {selectedProduct.drink === "Yes" ? <p>Drinks:</p> : <></>} */}
        {products.drinks?.map(
          (drink, index) =>
            selectedProduct.drink === "Yes" && (
              <label
                className={styles.labelGroup}
                key={index}
                style={highlightedIndex === index ? highlighted : noHighlight}
              >
                <img
                  src={process.env.PUBLIC_URL + drink.drinkImg}
                  alt={selectedProduct.name}
                />
                <input
                  name="drinks"
                  type="radio"
                  value={drink.drinkName}
                  onChange={(e) =>
                    setDrinks({
                      val: e.target.value,
                      img: drink.drinkImg,
                      handleHighlight: handleHighlight(index),
                    })
                  }
                />
                <span>{drink.drinkName}</span>
              </label>
            )
        )}
      </div>
      <div className={styles.addOns}>
        {products.addOns?.map((addon, index) => (
          <label
            className={styles.labelGroup}
            key={index}
            style={
              highlightedIndex2.includes(index) ? highlighted : noHighlight
            }
          >
            <img
              src={process.env.PUBLIC_URL + addon.addOnsImg}
              alt={selectedProduct.name}
            />
            <input
              name="addons"
              type="checkbox"
              data-img={addon.addOnsImg}
              data-price={addon.price}
              value={addon.addOnsName}
              onChange={(e) => handleCheckboxChangeAndToggle(e, index)}
            />
            <span>{addon.addOnsName}</span>
          </label>
        ))}
      </div>
      <br />
      <div>
        <button type="submit" className={styles.btnAddToCart}>
          Add to Cart
        </button>
        <button className={styles.btnBack} onClick={() => goBackToFilter()}>
          Back
        </button>
      </div>
    </form>
  );
}
