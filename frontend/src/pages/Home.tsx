import "@fontsource/abhaya-libre/800.css";
import dog from "../assets/dog.png";
import { Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"; // ✅ Updated for CSS Modules

export default function Home({ isLoggedIn = false }) {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <img src={dog} alt="dog" className={styles.heroImage} />
          <div className={styles.heroText}>
            <h1>Free Food, Less Waste:</h1>
            <h1>A Sustainable Campus Solution</h1>
          </div>
        </div>

        <Divider className={styles.customDivider} />

        <h2 className={styles.sectionTitle}>What is Spark!Bytes?</h2>
        <p className={styles.sectionDescription}>
          Spark!Bytes is a community-driven platform for BU students and faculty
          to share and enjoy leftover food from on-campus events. Users can
          create events to offer surplus food or sign up to claim free meals at
          various campus locations—helping reduce waste and foster
          sustainability!
        </p>

        <Button
          type="primary"
          className={styles.ctaButton}
          onClick={() => navigate(isLoggedIn ? "/events" : "/sign-in")}
        >
          Try Spark!Bytes
        </Button>
      </div>
    </div>
  );
}
