import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Beposke from "../pages/Beposke";
import Catalogue from "../pages/Catalogue";
import SingleCatalogue from "../pages/SingleCatalogue";
import ProductPage from "../pages/ProductPage";
import GetInTouch from "../pages/GetInTouch";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element: <Home /> },   
      { path: "beposke", element: <Beposke /> },
      { path: "catalogue", element: <Catalogue /> },
      { path: "single-catalogue/:id", element: <SingleCatalogue /> },
      { path: "view-product/:id", element: <ProductPage /> },
      { path: "get-in-touch", element: <GetInTouch /> }, 
      { path: "search", element: <SearchPage /> }, 
    ],
  },
]);

export default router;
