import axios from "axios";

const getCurrentLanguage = (): string => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme-storage");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.state?.language || "ru";
      } catch {
        return "ru";
      }
    }
  }
  return "ru";
};

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://upbeat-peace-7fb19faf3b.strapiapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

API.interceptors.request.use(
  (config) => {
    if (!config.timeout || config.timeout < 20000) {
      config.timeout = 20000;
    }

    // Only add locale if it's not already set
    if (!config.params?.locale) {
      const currentLanguage = getCurrentLanguage();
      if (config.params) {
        config.params.locale = currentLanguage;
      } else {
        config.params = { locale: currentLanguage };
      }
    }

    console.log("API Request:", config.url, config.params);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log(
      "API Response:",
      response.config.url,
      response.status,
      response.data
    );
    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.config?.url,
      error.response?.status,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

export default API;
