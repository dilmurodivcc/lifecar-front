import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "@/API";

interface ProductFilters {
  search?: string;
  categoryId?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
  featured?: boolean;
}

interface ProductImage {
  id: number;
  url: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
}

interface ProductCategory {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  old_price?: string;
  slug: string;
  is_featured: boolean;
  image: ProductImage;
  product_categroy: ProductCategory;
  detail?: {
    full_info: string;
    waranty: string;
    date: string;
    delivary: boolean;
    quantity: number;
    brand: string;
    img?: ProductImage[];
  };
  localizations?: Array<{
    id: number;
    title: string;
    description: string;
    price: string;
    locale: string;
  }>;
}

interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const useProducts = (locale: string = "uz", filters: ProductFilters = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", locale, filters],
    queryFn: async () => {
      try {
        const params: Record<string, unknown> = {
          locale: locale,
          populate: "*",
        };

        if (filters.search) {
          params.filters = {
            $or: [
              { title: { $containsi: filters.search } },
              { description: { $containsi: filters.search } },
            ],
          };
        }

        if (filters.categoryId && filters.categoryId !== "all") {
          params.filters = {
            ...((params.filters as Record<string, unknown>) || {}),
            product_categroy: {
              id: { $eq: filters.categoryId },
            },
          };
        }

        if (filters.featured !== undefined) {
          params.filters = {
            ...((params.filters as Record<string, unknown>) || {}),
            is_featured: { $eq: filters.featured },
          };
        }

        if (filters.sortBy) {
          switch (filters.sortBy) {
            case "price-low":
              params.sort = "price:asc";
              break;
            case "price-high":
              params.sort = "price:desc";
              break;
            default:
              params.sort = "createdAt:desc";
          }
        }

        if (filters.page && filters.pageSize) {
          params.pagination = {
            page: filters.page,
            pageSize: filters.pageSize,
          };
        }

        const response = await API.get("/products", { params });
        return response;
      } catch (error) {
        throw error;
      }
    },
    enabled: true,
    retry: 1,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  return { data, isLoading, error };
};

const useProductCategories = (locale: string = "uz") => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product-categories", locale],
    queryFn: async () => {
      const response = await API.get("/product  -categroys", {
        params: {
          locale: locale,
          populate: "*",
        },
      });
      return response;
    },
    enabled: true,
    retry: 2,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (error) {
    }
  }, [error]);

  return { data, isLoading, error };
};

const useProductBySlug = (slug: string, locale: string = "uz") => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug, locale],
    queryFn: async () => {
      try {
        const response = await API.get("/products", {
          params: {
            locale: locale,
            "populate[product_categroy]": true,
            "populate[detail][populate]": "*",
            filters: {
              slug: { $eq: slug },
            },
          },
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!slug,
    retry: 1,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching product:", error);
    }
  }, [error]);

  return { data, isLoading, error };
};

export { useProducts, useProductCategories, useProductBySlug };
export type { Product, ProductFilters, ProductsResponse, ProductCategory };
