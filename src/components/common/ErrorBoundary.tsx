"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{
  error?: Error;
  resetError: () => void;
}> = ({ error, resetError }) => {
  return (
    <div
      className="error-boundary"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        color: "var(--text)",
        padding: "20px",
      }}
    >
      <div
        className="error-container"
        style={{
          textAlign: "center",
          maxWidth: "500px",
          padding: "40px",
          background: "var(--glass-bg)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "16px",
            color: "var(--text)",
          }}
        >
          Xatolik yuz berdi
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "24px",
            color: "var(--text-secondary)",
          }}
        >
          Kechirasiz, saytda muammo bor. Iltimos, qaytadan urinib ko'ring.
        </p>
        {process.env.NODE_ENV === "development" && error && (
          <details style={{ margin: "20px 0", textAlign: "left" }}>
            <summary
              style={{
                cursor: "pointer",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Xatolik tafsilotlari
            </summary>
            <pre
              style={{
                background: "var(--bg-ter)",
                padding: "12px",
                borderRadius: "8px",
                overflowX: "auto",
                fontSize: "0.9rem",
              }}
            >
              {error.message}
            </pre>
          </details>
        )}
        <button
          onClick={resetError}
          className="retry-button"
          style={{
            background: "var(--black)",
            color: "var(--white)",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-sec)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--black)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Qaytadan urinish
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
