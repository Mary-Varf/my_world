import styles from "./Sidebar.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy;Copyright {new Date().getFullYear()} by My World
      </p>
    </footer>
  );
};

export default Footer;
