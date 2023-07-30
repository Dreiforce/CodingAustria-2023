import styles from "./Dropdown.module.css";
const Dropdown = ({ onClose }) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.background} />
      <div className={styles.status3}>
        <div className={styles.pause}>Pause</div>
        <div className={styles.status3Child} />
        <img className={styles.vectorIcon} alt="" src="/vector6.svg" />
      </div>
      <div className={styles.status2}>
        <div className={styles.pause}>Im Einsatz</div>
        <div className={styles.status2Child} />
        <img className={styles.vectorIcon1} alt="" src="/vector7.svg" />
      </div>
      <div className={styles.status1}>
        <div className={styles.pause}>Verfügbar</div>
        <div className={styles.status1Child} />
        <img className={styles.vectorIcon2} alt="" src="/vector8.svg" />
      </div>
    </div>
  );
};

export default Dropdown;
