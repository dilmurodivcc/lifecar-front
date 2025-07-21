import React from "react";
import {
  FaXTwitter,
  FaGithub,
  FaRedditAlien,
  FaYoutube,
} from "react-icons/fa6";
import { IoMdArrowRoundUp } from "react-icons/io";

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-contact">
        <div className="footer-col-title">Social links</div>
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
      <div className="footer-links-grid">
        <div className="footer-col">
          <div className="footer-col-title">Pages</div>
          <a href="#">Home</a>
          <a href="#">Contact</a>
          <a href="#">Services</a>
          <a href="#">Shop</a>
          <a href="#">About Us</a>
        </div>
      </div>
      <div className="footer-map">
        <div className="footer-col-title">Bizning manzil</div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.123456789!2d69.240073!3d41.299495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b123456789%3A0xabcdef123456789!2sLifecar%20Service!5e0!3m2!1suz!2s!4v1710000000000!5m2!1suz!2s"
          width="400"
          height="250"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bizning manzil"
        ></iframe>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-copyright">© 2025 Made by Lifecar</div>
      <div className="footer-backToTop">
        Back To Top <IoMdArrowRoundUp />
      </div>
    </div>
  </footer>
);

export default Footer;
