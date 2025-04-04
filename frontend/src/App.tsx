import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
// import SignIn from "./pages/SignIn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Navbar } from "./pages/Navbar";
import Events from "./pages/Events";
import Footer from "./pages/Footer";
import Food from "./pages/Food";
import Profile from "./pages/Profile";

function LayoutWithConditionals() {
  const location = useLocation();

  // These routes should NOT show the Navbar
  const noNavbarRoutes = [
    "/signin",
    "/signin",
    "/signup",
    "/sign-up",
    "/profile",
  ];

  const shouldShowNavbar = !noNavbarRoutes.includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/food" element={<Food />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
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
