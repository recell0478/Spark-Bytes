import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import dog from "../assets/dog.png";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.spark}>
        <img src={dog} alt="Dog" className={styles.dog} />
        <h1 className={styles.title}>Spark!Bytes</h1>
      </div>
      <ul className={styles.menuItems}>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/events">Create Events</Link>
        </li>
        <li>
          <Link to="/food">Food Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};
