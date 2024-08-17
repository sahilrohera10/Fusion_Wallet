import "./Hero.css";
import { primary_color } from "../../constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      navigate("/wallet");
    }
  }, [navigate]);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="stats left-stats">
          <div className="stat-item">
            <span className="stat-value">93m+</span>
            <span className="stat-label">Total locked</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">3.2b</span>
            <span className="stat-label">Market size</span>
          </div>
        </div>

        <div className="main-title">
          <p className="subtitle">All Your Crypto. One Secure Vault.</p>
          <h1 className="title">
            Next level of <span style={{ color: primary_color }}>⚡crypto</span>{" "}
            the <span style={{ color: primary_color }}># Fusion</span> Wallet
          </h1>
          <button
            className="cta-button"
            style={{ backgroundColor: primary_color }}
          >
            Get Started
          </button>
        </div>

        <div className="stats right-stats">
          <div className="stat-item">
            <span className="stat-value">1k+</span>
            <span className="stat-label">Awards</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">221k</span>
            <span className="stat-label">Transactions</span>
          </div>
        </div>
      </div>

      {/* <div className="carousel-indicators">
        <div className="indicator active">1</div>
        <div className="indicator">2</div>
        <div className="indicator">3</div>
      </div> */}
    </section>
  );
}
