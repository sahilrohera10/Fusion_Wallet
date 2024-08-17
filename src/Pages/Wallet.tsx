import { useEffect } from "react";
import Nav from "../Components/Landing/Nav";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const navigate = useNavigate();

  useEffect(() => {
    const passkey = localStorage.getItem("auth");
    if (!passkey) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <Nav />
      Wallet
    </div>
  );
}
