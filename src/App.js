import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HillCipher from "./pages/HillCipher";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Profile from "./components/users/Profile";
import Docs from "./pages/Docs";
import About from "./pages/About";
import Encrypt from "./pages/hillCipher/Encrypt";
import Decrypt from "./pages/hillCipher/Decrypt";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="875876081798-d206m0t51varq32rd09k41nrr5nfegp2.apps.googleusercontent.com">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hillcipher" element={<HillCipher />} />
        <Route path="/encrypt" element={<Encrypt />} />
        <Route path="/decrypt" element={<Decrypt />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
