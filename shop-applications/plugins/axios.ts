import axios from "axios";
export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig();
  const api = axios.create({
    baseURL: config.public.API_URL || "http://localhost:3000",
    headers: {
      common: {},
    },
    timeout: 10000,
  });
  const omise = axios.create({
    baseURL: "https://api.omise.co",
    auth: {
      username: config.public.OMISE_PUBLIC,
      password: "",
    },
  });
  const location = axios.create({
    baseURL: config.public.API_LOCATION,
    headers: {
      common: {},
    },
    timeout: 100000,
  });

  //handel error
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return {
    provide: {
      api: api,
      omise: omise,
      location: location,
    },
  };
});
