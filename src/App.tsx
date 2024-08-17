import "./App.css";
import Landing from "./Pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnBoarding from "./Pages/OnBoarding";
import Wallet from "./Pages/Wallet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboard" element={<OnBoarding />} />
        <Route path="/wallet" element={<Wallet />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
