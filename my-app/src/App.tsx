// App.tsx
import "./App.css";
import { Navbar } from "./pages/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [user, setUser] = useState<{ email: string; username: string } | null>(null);

  // Move auth logic here
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        fetchUserProfile(session.user.email!);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.email!);
      } else {
        setUser(null);
      }
    });

    checkAuth();
    return () => subscription?.unsubscribe();
  }, []);

  const fetchUserProfile = async (email: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("email", email)
      .single();

    if (!error && data) {
      setUser({ email, username: data.username });
    }
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;