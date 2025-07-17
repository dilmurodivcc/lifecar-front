import React from "react";
import {
  FaXTwitter,
  FaGithub,
  FaRedditAlien,
  FaYoutube,
  FaGlobe,
  FaRegMoon,
  FaRegSun,
} from "react-icons/fa6";

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-contact">
        <a href="mailto:info@lifecar.com" className="footer-email">
          info@lifecar.com
        </a>
        <div className="footer-social">
          <a href="#" aria-label="X">
            <FaXTwitter />
          </a>
          <a href="#" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="#" aria-label="Reddit">
            <FaRedditAlien />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>
      {/* Center: Links */}
      <div className="footer-links-grid">
        <div className="footer-col">
          <div className="footer-col-title">Product</div>
          <a href="#">Home</a>
          <a href="#">Pricing</a>
          <a href="#">Features</a>
          <a href="#">Enterprise</a>
          <a href="#">Downloads</a>
          <a href="#">Students</a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Resources</div>
          <a href="#">Docs</a>
          <a href="#">Blog</a>
          <a href="#">Forum</a>
          <a href="#">Changelog</a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Company</div>
          <a href="#">Lifecar</a>
          <a href="#">Careers</a>
          <a href="#">Community</a>
          <a href="#">Customers</a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Legal</div>
          <a href="#">Terms</a>
          <a href="#">Security</a>
          <a href="#">Privacy</a>
        </div>
      </div>
      {/* Right: Language & Theme */}
      <div className="footer-controls">
        <div className="footer-lang-switch">
          <FaGlobe />
          <select aria-label="Language">
            <option>English</option>
            <option>O&apos;zbek</option>
            <option>Русский</option>
          </select>
        </div>
        <div className="footer-theme-switch">
          <button aria-label="Light mode">
            <FaRegSun />
          </button>
          <button aria-label="Dark mode">
            <FaRegMoon />
          </button>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-copyright">© 2025 Made by Lifecar</div>
      <div className="footer-badge">
        <span className="footer-soc-badge">SOC 2 Certified</span>
      </div>
    </div>
  </footer>
);

export default Footer;
