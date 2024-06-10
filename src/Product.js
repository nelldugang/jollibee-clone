import styles from "./Product.module.css";
import ProductItem from "./ProductList";
import MainProduct from "./MainProduct";

function Product({
  productList,
  handleSelection,
  selectedProduct,
  addToCart,
  goBackToFilter,
  products,
}) {
  return (
    <div className={styles.itemGrid}>
      {selectedProduct ? (
        <MainProduct
          selectedProduct={selectedProduct}
          products={products}
          addToCart={addToCart}
          goBackToFilter={goBackToFilter}
        />
      ) : (
        productList.map((item, index) => (
          <div key={`${item.id}-${index}`}>
            <ProductItem item={item} handleSelection={handleSelection} />
          </div>
        ))
      )}
    </div>
  );
}

export default Product;
