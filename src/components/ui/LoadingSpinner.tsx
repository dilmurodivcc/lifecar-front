import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "spinner-small",
    medium: "spinner-medium",
    large: "spinner-large",
  };

  return (
    <div className={`loading-spinner-container ${className}`}>
      <div className={`loading-spinner-minimal ${sizeClasses[size]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
