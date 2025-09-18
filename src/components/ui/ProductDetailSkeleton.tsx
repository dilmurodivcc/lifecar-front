import React from "react";

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="product-detail-loading">
      <div className="container">
        <div className="loading-skeleton">
          {/* Breadcrumb skeleton */}
          <div className="skeleton-breadcrumb">
            <div className="skeleton-breadcrumb-item"></div>
            <div className="skeleton-breadcrumb-separator"></div>
            <div className="skeleton-breadcrumb-item"></div>
            <div className="skeleton-breadcrumb-separator"></div>
            <div className="skeleton-breadcrumb-item"></div>
            <div className="skeleton-breadcrumb-separator"></div>
            <div className="skeleton-breadcrumb-item"></div>
          </div>

          {/* Product content skeleton */}
          <div className="product-content-skeleton">
            {/* Gallery skeleton */}
            <div className="product-gallery-skeleton">
              <div className="main-image-skeleton">
                <div className="skeleton-shimmer"></div>
              </div>
              <div className="thumbnail-gallery-skeleton">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="thumbnail-skeleton">
                    <div className="skeleton-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product info skeleton */}
            <div className="product-info-skeleton">
              <div className="product-header-skeleton">
                <div className="category-badge-skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
                <div className="product-title-skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
                <div className="product-description-skeleton">
                  <div className="skeleton-shimmer"></div>
                  <div className="skeleton-shimmer"></div>
                </div>
              </div>

              <div className="product-pricing-skeleton">
                <div className="price-container-skeleton">
                  <div className="current-price-skeleton">
                    <div className="skeleton-shimmer"></div>
                  </div>
                  <div className="old-price-skeleton">
                    <div className="skeleton-shimmer"></div>
                  </div>
                </div>
                <div className="discount-badge-skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Product details skeleton */}
          <div className="product-details-skeleton">
            <div className="container">
              <div className="detail-section-skeleton">
                <div className="detail-title-skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
                <div className="detail-content-skeleton">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="detail-paragraph-skeleton">
                      <div className="skeleton-shimmer"></div>
                    </div>
                  ))}
                </div>
                <div className="expand-btn-skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
              </div>

              <div className="product-specs-skeleton">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="spec-item-skeleton">
                    <div className="spec-label-skeleton">
                      <div className="skeleton-shimmer"></div>
                    </div>
                    <div className="spec-value-skeleton">
                      <div className="skeleton-shimmer"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
