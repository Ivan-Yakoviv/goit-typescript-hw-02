import axios from "axios";

const API_KEY = "otTGWoIxQNzliFudXJVId93wApk-ehHVJdDDWbun6I4";
axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;


export const fetchPhotos = async (query,page) => {
   const response = await axios.get("/search/photos", {
    params: {
      query,
      per_page: 18,
      page,
      orientation: "landscape",
    },
  });

  return response.data;
};