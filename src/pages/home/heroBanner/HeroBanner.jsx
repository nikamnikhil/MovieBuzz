import { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { LazyLoadImage } from "react-lazy-load-image-component";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("movie/upcoming");
  const { url } = useSelector((state) => state?.home);
  useEffect(() => {
    const backImg =
    url &&   url?.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(backImg);
  }, [data]);
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query?.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  console.log("LOADING",loading)
  console.log("url",url)
  console.log("background",background)
  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <LazyLoadImage className={"lazy-load-image-background"} src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, Tv shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a move or tv show..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
