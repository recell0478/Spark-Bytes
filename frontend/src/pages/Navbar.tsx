import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import profile from "../assets/profile.png";
import dog from "../assets/dog.png";
import menu from "../assets/menu.png";

interface NavBarProps {
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavBarProps> = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const iconRef = useRef<HTMLImageElement | null>(null);
  const location = useLocation();

  // Close menu when route changes (e.g., clicking a menu link)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Logo and Title */}
      <div className={styles.spark}>
        <img src={dog} alt="Dog" className={styles.dog} />
        <h1 className={styles.title}>Spark!Bytes</h1>
      </div>

      {/* Hamburger icon for mobile */}
      <img
        src={menu}
        alt="Menu"
        ref={iconRef}
        className={styles.menuIcon}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* Navigation Menu */}
      <ul
        className={`${styles.menuItems} ${isMenuOpen ? styles.showMenu : ""}`}
        ref={menuRef}
      >
        <li>
          <Link to="/home">Home</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/events">Create Events</Link>
            </li>
            <li>
              <Link to="/food">Food Sign Up</Link>
            </li>
            <li>
              <Link to="/profile">
                <img
                  src={profile}
                  alt="Profile"
                  className={styles.profileImage}
                />
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/sign-in">Sign In / Sign Up</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
