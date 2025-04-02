import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HillCipher from "./pages/HillCipher";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Profile from "./components/users/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hillcipher" element={<HillCipher />} />
      </Routes>
    </Router>
  );
}

export default App;
