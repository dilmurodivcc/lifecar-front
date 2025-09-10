"use client";

import React from "react";

const ContactSec = () => {
  const companyAddress =
    "Toshkent shahar, Chilonzor tumani, Bunyodkor ko'chasi, 1-uy";
  const phone1 = "+998 90 123 45 67";
  const phone2 = "+998 71 234 56 78";

  const telegramChannel = "https://t.me/lifecar_uz";
  const telegramAdmin = "https://t.me/lifecar_admin";
  const instagram = "https://instagram.com/lifecar_uz";
  const youtube = "https://youtube.com/@lifecar_uz";

  const openYandexMaps = () => {
    const encodedAddress = encodeURIComponent(companyAddress);
    window.open(`https://yandex.com/maps/?text=${encodedAddress}`, "_blank");
  };

  const openGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(companyAddress);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  };

  return (
    <div className="contact-sec">
      <div className="container">
            <h2 className="contact-title">Bizning Manzil va kontaktlarimiz.</h2>
        <div className="contact-content">
          <div className="contact-left">

            <div className="contact-info">
              <div className="address-section">
                <h3>Address</h3>
                <p className="address-text">{companyAddress}</p>
              </div>

              <div className="working-hours">
                <h3>Working Hours</h3>
                <p>Mon–Fri: 09:00 – 18:00</p>
                <p>Sat: 10:00 – 15:00</p>
                <p>Sun: Closed</p>
              </div>

              <div className="phone-numbers">
                <h3>Phone Numbers</h3>
                <a href={`tel:${phone1}`} className="phone-link">
                  {phone1}
                </a>
                <a href={`tel:${phone2}`} className="phone-link">
                  {phone2}
                </a>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a
                  href={telegramChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Telegram Channel"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.21-5.35 3.55-.51.35-.97.52-1.38.51-.46-.01-.67-.31-.67-.68 0-.36.1-.81.15-1.08.2-1.25.58-3.95.65-4.22.01-.05.01-.1-.03-.14-.04-.04-.1-.05-.15-.03-.06.02-.98.48-2.79 1.4-.26.13-.5.2-.72.2-.24 0-.35-.07-.35-.2 0-.12.1-.25.28-.37.35-.24 3.24-1.5 3.4-1.58.16-.08.32-.12.48-.12.16 0 .32.04.48.12.16.08 3.05 1.34 3.4 1.58.18.12.28.25.28.37 0 .13-.11.2-.35.2-.22 0-.46-.07-.72-.2-.16-.08-1.73-.9-2.79-1.4-.05-.02-.09-.01-.15.03-.04.04-.04.09-.03.14.07.27.45 2.97.65 4.22.05.27.15.72.15 1.08 0 .37-.21.69-.67.68-.41.01-.87-.16-1.38-.51-3.46-2.34-5.24-3.53-5.35-3.55-.08-.02-.19-.04-.27.02-.08.06-.08.17-.07.2.05.21 2.61 2.54 2.76 2.69.57.58 1.21.94 2.23 1.5.85.56 1.35.92 2.23 1.5.56.37 1 .8 1.58.75.26-.03.54-.28.68-1.03.33-1.77.98-5.61 1.13-7.19.05-.5.05-.8 0-1.3-.05-.5-.1-.8-.15-1.3z" />
                  </svg>
                </a>

                <a
                  href={telegramAdmin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Telegram Admin"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.21-5.35 3.55-.51.35-.97.52-1.38.51-.46-.01-.67-.31-.67-.68 0-.36.1-.81.15-1.08.2-1.25.58-3.95.65-4.22.01-.05.01-.1-.03-.14-.04-.04-.1-.05-.15-.03-.06.02-.98.48-2.79 1.4-.26.13-.5.2-.72.2-.24 0-.35-.07-.35-.2 0-.12.1-.25.28-.37.35-.24 3.24-1.5 3.4-1.58.16-.08.32-.12.48-.12.16 0 .32.04.48.12.16.08 3.05 1.34 3.4 1.58.18.12.28.25.28.37 0 .13-.11.2-.35.2-.22 0-.46-.07-.72-.2-.16-.08-1.73-.9-2.79-1.4-.05-.02-.09-.01-.15.03-.04.04-.04.09-.03.14.07.27.45 2.97.65 4.22.05.27.15.72.15 1.08 0 .37-.21.69-.67.68-.41.01-.87-.16-1.38-.51-3.46-2.34-5.24-3.53-5.35-3.55-.08-.02-.19-.04-.27.02-.08.06-.08.17-.07.2.05.21 2.61 2.54 2.76 2.69.57.58 1.21.94 2.23 1.5.85.56 1.35.92 2.23 1.5.56.37 1 .8 1.58.75.26-.03.54-.28.68-1.03.33-1.77.98-5.61 1.13-7.19.05-.5.05-.8 0-1.3-.05-.5-.1-.8-.15-1.3z" />
                  </svg>
                </a>

                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="YouTube"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="map-buttons">
              <button onClick={openYandexMaps} className="map-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Yandex Maps
              </button>

              <button onClick={openGoogleMaps} className="map-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSec;
