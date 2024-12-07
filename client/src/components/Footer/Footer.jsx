import React from "react";
import { Link } from "react-router-dom";
import linkedinLogo from "../../assets/icons8-linkedin.svg";
import emailLogo from "../../assets/icons8-mail-50.png";

function Footer() {
  return (
    <section className="footer bg-gray-800 text-white py-6">
      <div className="footer-container flex justify-center gap-8 mb-4">
        <a
          href="https://www.linkedin.com/in/akash-mishra-2b2348224"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link hover:opacity-80"
        >
          <img
            src={linkedinLogo}
            alt="LinkedIn"
            className="w-8 h-8 transition-all"
          />
        </a>
        <a
          href="mailto: aakashvatsh007@gmail.com"
          className="footer-link hover:opacity-80"
        >
          <img src={emailLogo} alt="Email" className="w-8 h-8 transition-all" />
        </a>
      </div>
      <div className="copy-container text-center text-sm opacity-70">
        &copy;2024 Made by Akash Mishra
      </div>
    </section>
  );
}

export default Footer;
