import { useEffect } from "react"
import { fetchDataFromApi } from './utils/Api';
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { url } = useSelector((state) => state.home);
  useEffect(() => {
    getApiTesting();
  }, [])

  const getApiTesting = () => {
    fetchDataFromApi("movie/popular").then((res) =>
      dispatch(getApiConfiguration((res))
      ))
  }
  return (
    <>
      MovieBuzz
    </>
  )
}

export default App
