import { primary_color } from "../../constants";
import "./Nav.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const currentDate = new Date();
  const navigate = useNavigate();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = dayNames[currentDate.getDay()];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[currentDate.getMonth()];
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const encryptPassword = (password: string, key: string) => {
    // Encrypt the password using AES encryption
    const encrypted = CryptoJS.AES.encrypt(password, key).toString();
    return encrypted;
  };

  const passKeySubmit = () => {
    if (hasKey) {
      const decrypted = CryptoJS.AES.decrypt(hasKey, "fusion");
      const originalText = decrypted.toString(CryptoJS.enc.Utf8);
      if (password !== originalText) {
        setIsError(true);
        setLoading(false);
        return;
      } else {
        localStorage.setItem("auth", "true");
        setLoading(false);
        navigate("/wallet");
      }
    } else {
      if (password !== confirmPassword) {
        setIsError(true);
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setIsError(false);

        const encryptedPassword = encryptPassword(password, "fusion");
        localStorage.setItem("passkey", encryptedPassword);
        localStorage.setItem("auth", "true");
        setLoading(false);
        navigate("/wallet");
      }, 1000);
    }
    setLoading(true);
  };

  const [isAuth, setIsAuth] = useState(false);
  const [hasKey, setHasKey] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const key = localStorage.getItem("passkey");
    console.log(key);
    if (key) {
      setHasKey(key);
    }
    if (auth) {
      setIsAuth(true);
    }
  }, []);

  return (
    <>
      <Dialog>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set password to create your wallet</DialogTitle>
            <br />
            <DialogDescription>
              {hasKey ? (
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter Password"
                />
              ) : (
                <>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Set Password"
                  />
                  <br />
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </>
              )}

              <br />
              {isError && (
                <>
                  {" "}
                  <p className="text-red-600">
                    {" "}
                    Password doesn't matched! Try again
                  </p>
                  <br />
                </>
              )}
              {loading ? ( // Loader
                "processing...."
              ) : (
                <Button onClick={() => passKeySubmit()} className="ml-44">
                  Submit
                </Button>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>

        <nav className="navbar">
          <div className="navbar-left">
            <h2 style={{ color: primary_color }} className="navbar-brand">
              ⚛ FUSION
            </h2>
          </div>
          <div className="navbar-right">
            <span className="navbar-date">
              {day}, {month} {date} {year}
            </span>
            {!isAuth ? (
              <DialogTrigger>
                <button className="navbar-login">Log in ▼</button>
              </DialogTrigger>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem("auth");
                  window.location.reload();
                }}
                className="navbar-login"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </Dialog>
    </>
  );
}
