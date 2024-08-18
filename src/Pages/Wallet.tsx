import { useEffect } from "react";
import Nav from "../Components/Landing/Nav";
import WalletCard from "../Components/Wallet/WalletCard";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const mnemonic = localStorage.getItem("mnemonic");
    if (!auth) {
      navigate("/");
      return;
    }
    if (!mnemonic) {
      navigate("/onboard");
    }
  }, [navigate]);

  return (
    <div>
      <Nav />
      <WalletCard />
    </div>
  );
}
