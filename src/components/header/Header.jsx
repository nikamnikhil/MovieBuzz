import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import logo from "../../../src/assets/movix-logo.png";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    }
    else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar)
    return () => { window.removeEventListener("scroll", controlNavbar) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY])

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query?.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000)
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  }

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  }

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>Tv Shows</li>
          <li className="menuItem">
            <HiOutlineSearch className="icons" onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch className="icons" onClick={openSearch} />
          {
            mobileMenu ? (
              <VscChromeClose className="icons" onClick={() => { setMobileMenu(false) }} />
            ) : (
              <SlMenu className="icons" onClick={openMobileMenu} />
            )
          }
        </div>
      </ContentWrapper>
      {showSearch && (<div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={() => { setShowSearch(false) }} />
          </div>
        </ContentWrapper>
      </div>)}
    </header>
  );
};

export default Header;