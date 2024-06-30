import "./App.css";
import Product from "./Product";
import SideBar from "./SideBar";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import Cart from "./Cart";

const BASE_URL = "http://localhost:9000";

function App() {
  const [products, setProduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [borders, setBorder] = useState(null);
  useEffect(function () {
    async function fetchProduct() {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        setProduct(data);
        setProductList(
          data.foods?.filter((item) => item["type"] === "Super Meals")
        );
      } catch {
        alert("There was an error loading data...");
      }
    }
    fetchProduct();
  }, []);

  const filterItems = (foodType, id) => {
    const result = products.foods?.filter((item) => item["type"] === foodType);
    setProductList(result);
    setBorder(id);

    setSelectedProduct(null);
  };

  function goBackToFilter() {
    setSelectedProduct(null);
  }

  const handleSelection = (newProduct) => {
    setSelectedProduct((selected) =>
      selected?.id === newProduct.id ? null : newProduct
    );
  };

  function addToCart(product) {
    setCart([...cart, product]);
  }

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  return (
    <div className={styles.container}>
      <SideBar
        products={products}
        filterItems={filterItems}
        productList={productList}
        borders={borders}
      />
      <Product
        productList={productList}
        handleSelection={handleSelection}
        selectedProduct={selectedProduct}
        addToCart={addToCart}
        goBackToFilter={goBackToFilter}
        products={products}
      />
      <Cart cart={cart} removeFromCart={removeFromCart} />
      {/* <SwitchHighlightComponent /> */}
    </div>
  );
}

const SwitchHighlightComponent = () => {
  // Step 2: Initialize state with the index of the highlighted element
  const [highlightedIndex, setHighlightedIndex] = useState(null); // Initially, no element is highlighted

  // Step 3: Create a function to switch the highlight to the clicked element
  const handleHighlight = (index) => {
    setHighlightedIndex(index);
  };

  const elements = ["Element 1", "Element 2", "Element 3"]; // Array of elements

  return (
    <div>
      {elements.map((element, index) => (
        <div
          key={index}
          onClick={() => handleHighlight(index)}
          style={{
            backgroundColor: highlightedIndex === index ? "yellow" : "white",
            padding: "20px",
            margin: "10px",
            cursor: "pointer",
            border: "1px solid black",
          }}
        >
          {element}
        </div>
      ))}
    </div>
  );
};

export default App;
