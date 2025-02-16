import styles from "./Modal.module.css";

const Modal = ({ show, onClose, children, orderCounter, formatCount }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>
            ORDER NUMBER {formatCount(orderCounter)}
          </h4>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.button}>
            <p>
              <b>Close</b>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
