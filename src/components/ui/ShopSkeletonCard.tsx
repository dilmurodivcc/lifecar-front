import React from "react";

interface ShopSkeletonCardProps {
  count?: number;
}

const ShopSkeletonCard: React.FC<ShopSkeletonCardProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className=" shop-skeleton" key={index}>
          <div className="skeleton-img">
            <div className="skeleton-shimmer"></div>
          </div>
          <div className="card-content">
            <div className="top">
              <div className="skeleton-title"></div>
              <div className="skeleton-desc"></div>
            </div>
            <div className="bottom">
              <div className="skeleton-price"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopSkeletonCard;
