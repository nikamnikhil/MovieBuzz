import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

const TMDBTOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
console.log(TMDBTOKEN)
const headers = {
  Authorization: "Bearer " + TMDBTOKEN,
  "Content-Type": "application/json;charset=utf-8",
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL+ url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
