import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Navbar } from "./pages/Navbar";
import Events from "./pages/Events";
import Footer from "./pages/Footer";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/Events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
