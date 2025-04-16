import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import dog from "../assets/dog.png";

interface NavBarProps {
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavBarProps> = ({ isLoggedIn = false }) => {
  return (
    <nav className={styles.navbar}>
      {/* Logo and Title */}
      <div className={styles.spark}>
        <img src={dog} alt="Dog" className={styles.dog} />
        <h1 className={styles.title}>Spark!Bytes</h1>
      </div>

      {/* Navigation Links */}
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
        
        {/* Conditional Profile Icon or Auth Link */}
        {isLoggedIn ? (
          <li>
            <Link to="/profile">
              <img
                src={profile}
                alt="Profile"
                className={styles.profileImage}
              />
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/sign-in">Sign In / Sign Up</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
