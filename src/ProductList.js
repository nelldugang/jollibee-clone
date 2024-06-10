import styles from "./ProductList.module.css";

export default function ProducItem({ item, handleSelection }) {
  return (
    <div className={styles.item} onClick={() => handleSelection(item)}>
      <img
        src={process.env.PUBLIC_URL + item.img}
        alt={item.name}
        className={styles.imgItem}
      />
      <h4>{item.foodName}</h4>
    </div>
  );
}
