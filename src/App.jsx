import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import Home from "../src/pages/home/Home";
import Details from "../src/pages/details/Detail";
import SearchResult from "../src/pages/searchResult/SearchResult";
import Explore from "../src/pages/explore/Explore";
import PageNotFound from "../src/pages/404/PageNotFound";
import Header from "../src/components/header/Header";
import Footer from "../src/components/footer/Footer";

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    fetchApiConfig();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaTtype/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/:explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
