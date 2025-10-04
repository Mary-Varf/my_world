import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <span className={styles.logo}>🌍 MyWorld</span>
    </Link>
  );
}

export default Logo;
