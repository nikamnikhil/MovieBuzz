import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import Home from "../src/pages/home/Home";
import Details from "../src/pages/details/Detail";
import SearcgResult from "../src/pages/searchResult/SearchResult";
import Explore from "../src/pages/explore/Explore";
import PageNotFound from "../src/pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    getApiTesting();
  }, []);

  const getApiTesting = () => {
    fetchDataFromApi("movie/popular").then((res) =>
      dispatch(getApiConfiguration(res))
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaTtype/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/:explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
