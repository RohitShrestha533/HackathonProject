import "./App.css";
import Navs from "./Components/Nav";
import About from "./Components/About";
import Gov from "./Components/Gov";
import Support from "./Components/Support";
import Transparency from "./Components/Transparency";
import Token from "./Components/Token";
import { Routes, Route } from "react-router";
import LandingPage from "./Components/LandingPage";
import Footer from "./Components/Footer";
import Account from "./Components/Account";

function App() {
  return (
    <div className="App">
      <Navs />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/gov-funding" element={<Gov />} />
        <Route path="/token" element={<Token />} />
        <Route path="/support" element={<Support />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
