import styles from "../../styles/AuthLayout.module.css";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
