import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "@/API";
const useServices = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const response = await API.get("/services", {
          params: {
            locale: "uz",
            populate: "*",
          },
        });
        return response;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    enabled: true,
    retry: 2,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (error) {
      console.error("useServices error:", error);
    }
  }, [error]);

  console.log("useServices data:", data);
  return { data, isLoading, error };
};

export default useServices;
