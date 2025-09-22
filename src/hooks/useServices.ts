import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "@/API";

interface ServiceFilters {
  search?: string;
  categoryId?: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

interface Service {
  id: number;
  title: string;
  description: string;
  price_from: string;
  image?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
    url?: string;
  };
  service_categories?: {
    data?: {
      attributes?: {
        name: string;
      };
    };
    name?: string;
  };
  categoryId?: number;
  categoryName?: string;
}

const useServices = (locale: string = "uz", filters: ServiceFilters = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["services", locale, filters],
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
            service_categories: {
              id: { $eq: filters.categoryId },
            },
          };
        }

        // Add sorting
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case "price-low":
              params.sort = "price_from:asc";
              break;
            case "price-high":
              params.sort = "price_from:desc";
              break;
            default:
              params.sort = "createdAt:desc";
          }
        }

        // Add pagination
        if (filters.page && filters.pageSize) {
          params.pagination = {
            page: filters.page,
            pageSize: filters.pageSize,
          };
        }

        const response = await API.get("/services", { params });
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
      // Error handling can be added here if needed
    }
  }, [error]);

  return { data, isLoading, error };
};

const useServiceCategories = (locale: string = "uz") => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["service-categories", locale],
    queryFn: async () => {
      const response = await API.get("/services-categories", {
        params: {
          locale: locale,
          populate: "services.image",
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
      // Error handling can be added here if needed
    }
  }, [error]);

  return { data, isLoading, error };
};

export { useServices, useServiceCategories };
export type { Service, ServiceFilters };
