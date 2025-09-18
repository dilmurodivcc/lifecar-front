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

interface Category {
  id: number;
  name: string;
  services?: Service[];
}

const useServices = (locale: string = "uz", filters: ServiceFilters = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["services", locale, filters],
    queryFn: async () => {
      try {
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
        } catch {
          const categoriesParams: Record<string, unknown> = {
            locale: locale,
            populate: {
              services: {
                populate: "*",
              },
            },
          };

          if (filters.categoryId && filters.categoryId !== "all") {
            categoriesParams.filters = {
              id: { $eq: filters.categoryId },
            };
          }

          const categoriesResponse = await API.get("/services-categories", {
            params: categoriesParams,
          });

          const allServices =
            categoriesResponse.data.data?.flatMap(
              (category: Category) =>
                category.services?.map((service: Service) => ({
                  ...service,
                  categoryId: category.id,
                  categoryName: category.name,
                })) || []
            ) || [];

          let filteredServices = allServices;

          if (filters.search) {
            filteredServices = filteredServices.filter(
              (service: Service) =>
                service.title
                  ?.toLowerCase()
                  .includes(filters.search!.toLowerCase()) ||
                service.description
                  ?.toLowerCase()
                  .includes(filters.search!.toLowerCase())
            );
          }

          if (filters.sortBy) {
            filteredServices.sort((a: Service, b: Service) => {
              switch (filters.sortBy) {
                case "price-low":
                  const aPrice = parseInt(
                    a.price_from?.replace(/[^\d]/g, "") || "0"
                  );
                  const bPrice = parseInt(
                    b.price_from?.replace(/[^\d]/g, "") || "0"
                  );
                  return aPrice - bPrice;
                case "price-high":
                  const aPriceHigh = parseInt(
                    a.price_from?.replace(/[^\d]/g, "") || "0"
                  );
                  const bPriceHigh = parseInt(
                    b.price_from?.replace(/[^\d]/g, "") || "0"
                  );
                  return bPriceHigh - aPriceHigh;
                default:
                  return 0;
              }
            });
          }

          const startIndex =
            ((filters.page || 1) - 1) * (filters.pageSize || 8);
          const endIndex = startIndex + (filters.pageSize || 8);
          const paginatedServices = filteredServices.slice(
            startIndex,
            endIndex
          );

          return {
            data: {
              data: paginatedServices,
              meta: {
                pagination: {
                  page: filters.page || 1,
                  pageSize: filters.pageSize || 8,
                  pageCount: Math.ceil(
                    filteredServices.length / (filters.pageSize || 8)
                  ),
                  total: filteredServices.length,
                },
              },
            },
          };
        }
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
