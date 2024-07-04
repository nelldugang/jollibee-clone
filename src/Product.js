import styles from "./Product.module.css";
import ProducList from "./ProductList";
import MainProduct from "./MainProduct";
import React from "react";

function Product({
  productList,
  handleSelection,
  selectedProduct,
  addToCart,
  goBackToFilter,
  products,
}) {
  return (
    <>
      {selectedProduct ? (
        <div className={styles.itemGridMain}>
          <MainProduct
            selectedProduct={selectedProduct}
            products={products}
            addToCart={addToCart}
            goBackToFilter={goBackToFilter}
          />
        </div>
      ) : (
        <div className={styles.itemGrid}>
          {productList.map((item, index) => (
            <React.Fragment key={`${item.id}-${index}`}>
              <ProducList item={item} handleSelection={handleSelection} />
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}

export default Product;
