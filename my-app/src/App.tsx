import "./App.css";
import { Navbar } from "./pages/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <h1>Welcome</h1>
      </div>
    </Router>
  );
}

export default App;
