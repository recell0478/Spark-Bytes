import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Spark!Bytes</h1>
      <ul className={styles.menuItems}>
        <li>
          <Link to="/">Create Events</Link>
        </li>
        <li>
          <Link to="/about">Login / Sign Up</Link>
        </li>
        <li>
          <Link to="/profile">
            <img src={profile} alt="Profile" className={styles.profileImage} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
