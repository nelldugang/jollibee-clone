import "./App.css";
import Product from "./Product";
import SideBar from "./SideBar";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import Cart from "./Cart";
import Modal from "./Modal";

// running local json data server
// const BASE_URL = "http://localhost:9000";
// git hub live server
const BASE_URL2 = "https://nelldugang.github.io/data-jollibee/products.json";

function App() {
  const [products, setProduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [borders, setBorder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderCounter, setorderCounter] = useState(0);

  const openModal = () => {
    setShowModal(true);
    setorderCounter((prev) => prev + 1);
  };

  const formatCount = (orderCounter) => {
    return orderCounter.toString().padStart(5, "0");
  };

  const closeModal = () => {
    setShowModal(false);
    setCart([]);
  };

  //fetch jollibee data
  useEffect(function () {
    async function fetchProduct() {
      try {
        // const res = await fetch(`${BASE_URL}/products`);
        const res2 = await fetch(`${BASE_URL2}`);
        // const data = await res.json();
        const data2 = await res2.json();
        // console.log(data);
        setProduct(data2.products);
        setProductList(
          data2.products.foods?.filter((item) => item["type"] === "Super Meals")
        );
      } catch {
        alert("There was an error loading data...");
      }
    }
    fetchProduct();
  }, []);

  // show result 1 of each type of foodtype
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

  // manage all cart items
  function addToCart(product) {
    setCart([...cart, product]);
  }

  // remove the selected index out of the cart
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
      <Cart cart={cart} removeFromCart={removeFromCart} openModal={openModal} />
      <Modal
        show={showModal}
        onClose={closeModal}
        removeFromCart={removeFromCart}
        orderCounter={orderCounter}
        formatCount={formatCount}
      >
        <p>Please proceed to the cashier and show the order number</p>
      </Modal>
    </div>
  );
}

export default App;
