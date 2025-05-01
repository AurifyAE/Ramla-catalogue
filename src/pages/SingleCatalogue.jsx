import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import beposkeBanner from "../assets/beposke/beposkeBanner.png";
import { getProductByCategory, getCategory } from "../api/api";

function SingleCatalogue() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/view-product/${productId}`);
  };

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchCategoryAndProducts();
  };

  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true);

      // Fetch category details
      const categoryResponse = await getCategory(id);
      // console.log(categoryResponse.data)
      setCategory(categoryResponse.data);

      // Fetch products for this category
      const productsResponse = await getProductByCategory(id);
      if (productsResponse.data && Array.isArray(productsResponse.data)) {
        setProducts(productsResponse.data);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load category data");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCategoryAndProducts();
    }
  }, [id]);

  // Loading spinner animation
  const LoadingSpinner = () => (
    <div className="flex flex-col justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900 mb-4"></div>
      <p className="text-lg font-poppins text-gray-700">Loading catalogue items...</p>
    </div>
  );

  // Error message component
  const ErrorMessage = () => (
    <div className="flex flex-col justify-center items-center h-64 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-sm w-full max-w-xl">
        <div className="flex items-center mb-3">
          <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-lg font-semibold text-red-800 font-poppins">Unable to Load Category</h3>
        </div>
        <p className="text-red-700 mb-4 font-poppins">{error}</p>
        <button 
          onClick={retryFetch}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-poppins"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Banner Section */}
      <div className="flex flex-col justify-center items-center">
        <div className="text-3xl md:text-4xl font-montaga text-center mt-10 mb-10">
          <h2>{category ? category.name : "Premium Bespoke Collection"}</h2>
        </div>
        <p className="font-poppins max-w-6xl text-sm sm:text-base px-4">
          {category && category.description 
            ? category.description 
            : "A bespoke suit is a fully custom-made suit tailored specifically to an individual's measurements, style preferences, and fabric choices. Unlike off-the-rack or made-to-measure suits, bespoke suits are crafted from scratch, ensuring a perfect fit and unique design. This process involves multiple fittings and high-quality craftsmanship, making bespoke suits the ultimate choice for those seeking luxury, elegance, and personalization."}
        </p>
        <img src={beposkeBanner} className="mt-12 mb-16 max-w-full" alt="Bespoke Banner" />
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 font-poppins px-2">
              {category ? category.name : "Collection"}
            </h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-sm:gap-8 max-sm:px-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="aspect-square overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity rounded-md shadow-sm"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <img
                      src={
                        product.image && product.image.length > 0
                          ? product.image[0].url
                          : "/api/placeholder/240/300"
                      }
                      alt={product.name || "Product image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 font-poppins">No products available in this category yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleCatalogue;