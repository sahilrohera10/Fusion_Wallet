import { useEffect } from "react";
import Nav from "../Components/Landing/Nav";
import { useNavigate } from "react-router-dom";
import ChooseCard from "../Components/Wallet/ChooseCard";

export default function OnBoarding() {
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
      <ChooseCard />
    </div>
  );
}
