"use client";

import React from "react";

const LoadingFallback: React.FC = () => {
  return (
    <div
      className="loading-fallback"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div
        className="loading-container"
        style={{
          textAlign: "center",
          padding: "40px",
        }}
      >
        <div
          className="loading-spinner"
          style={{
            marginBottom: "24px",
          }}
        >
          <div
            className="spinner"
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid var(--border-color)",
              borderTop: "4px solid var(--black)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto",
            }}
          ></div>
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            marginBottom: "8px",
            color: "var(--text)",
          }}
        >
          Yuklanmoqda...
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
          }}
        >
          Iltimos, kuting
        </p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `,
        }}
      />
    </div>
  );
};

export default LoadingFallback;
