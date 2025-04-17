import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Navbar } from "./pages/Navbar";
import Events from "./pages/Events";
import Footer from "./pages/Footer";
import Food from "./pages/Food";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabaseClient";
import EditProfile from "./pages/EditProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    // authentication changes (login and logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/events" element={<Events />} />
        <Route path="/food" element={<Food />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
