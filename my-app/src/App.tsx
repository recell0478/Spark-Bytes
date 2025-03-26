import "./App.css";
import { Navbar } from "./pages/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <h1>Welcome</h1>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
