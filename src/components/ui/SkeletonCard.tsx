import React from "react";

interface SkeletonCardProps {
  layout?: "grid" | "list";
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ layout = "grid" }) => {
  if (layout === "list") {
    return (
      <div className="card list skeleton">
        <div className="img-wrapper skeleton-img">
          <div className="skeleton-shimmer"></div>
        </div>
        <div className="card-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-desc"></div>
          <div className="card-bottom">
            <div className="skeleton-price"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card skeleton">
      <div className="img-wrapper skeleton-img">
        <div className="skeleton-shimmer"></div>
      </div>
      <div className="card-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-desc"></div>
        <div className="card-bottom">
          <div className="skeleton-price"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
