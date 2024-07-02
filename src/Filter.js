import styles from "./Filter.module.css";

export default function Filter({ product, filterItems, borders }) {
  return (
    <div
      className={styles.filter}
      style={{
        background: borders === product.id ? "antiquewhite" : "white",
      }}
      onClick={() => filterItems(product.type, product.id)}
    >
      <img src={process.env.PUBLIC_URL + product.img} alt={product.name} />
      <div className={styles.cardHeader}>
        <p>{product.type}</p>
      </div>
    </div>
  );
}
