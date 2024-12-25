import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, fetchProducts } from "./store/darazSlice";
import { Outlet } from "react-router";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  const logInStatus = useSelector((state) => state.userData.loginStatus);

  useEffect(() => {
    // Fetch user data and initialize
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    // Fetch product data
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop
      />
      <Outlet />
      {/* </ScrollToTop> */}
    </>
  );
}

export default App;
