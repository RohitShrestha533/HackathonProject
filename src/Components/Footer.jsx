import React from "react";
import "./Footer.css"; // Import your CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-left col-md-4 d-flex flex-column justify-content-center">
            <h2>Defi X</h2>
            <p>
              Experience a decentralized financial system with NPR-pegged
              stablecoin ensuring secure and transparent government funding at
              every level.
            </p>
            <p>Sign up to get the latest in DEFI X news and more.</p>
            <div className="email-signup d-flex">
              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                className="form-control"
              />
              <button type="button">→</button>
            </div>
            <p>© 2024 DEFI X CORP</p>
          </div>
          <div className="col-md-2"></div>
          <div className="footer-middle col-md-3">
            <p>About</p>
            <p>Government Funding</p>
            <p>NPRX</p>
            <p>Transparency</p>
            <p>Download</p>
          </div>
          <div className="footer-right col-md-3">
            <div className="row">
              <p>Privacy Policy and Terms of Service</p>
              <p>DEFI X Privacy Policy</p>
              <p>DEFI X Biometrics Privacy Policy</p>
              <p>DEFI X Financial Privacy Notice</p>
              <p>DEFI X Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
