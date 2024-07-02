import styles from "./SideBar.module.css";
import Filter from "./Filter";

function SideBar({ products, filterItems, productList, borders }) {
  const types = Array.from(
    new Set(products.foods?.map((item) => item.type))
  ).map((type) => {
    return products.foods?.find((item) => item.type === type);
  });

  return (
    <aside className={styles.sidebar}>
      {types.map((product, index) => (
        <Filter
          key={product.id}
          product={product}
          filterItems={filterItems}
          productList={productList}
          index={index}
          borders={borders}
        />
      ))}
    </aside>
  );
}

export default SideBar;
