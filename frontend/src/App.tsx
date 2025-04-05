import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Navbar } from "./pages/Navbar";
import Events from "./pages/Events";
import Footer from "./pages/Footer";
import Food from "./pages/Food";
import Profile from "./pages/Profile";

function LayoutWithConditionals() {
  const location = useLocation();

  const noNavbarRoutes = ["/sign-up"];

  const shouldShowNavbar = !noNavbarRoutes.includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {shouldShowNavbar && <Navbar isLoggedIn={undefined} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/food" element={<Food />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWithConditionals />
    </Router>
  );
}

export default App;
