import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import catalogue1 from "../assets/catalogue/catalogue1.png";
import catalogue2 from "../assets/catalogue/catalogue2.png";
import catalogue3 from "../assets/catalogue/catalogue3.png";
import catalogue4 from "../assets/catalogue/catalogue4.png";
import { getAllCategories, getProductByCategory } from "../api/api";

function Catalogue() {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Add scroll to top effect when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/view-product/${productId}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/single-catalogue/${category._id}`);
  };

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchCategoriesAndProducts();
  };

  const fetchCategoriesAndProducts = async () => {
    try {
      setLoading(true);

      // Fetch categories
      const categoriesResponse = await getAllCategories();
      const fetchedCategories = categoriesResponse.data;
      setCategories(fetchedCategories);

      // Initialize productsByCategory with empty arrays for each category
      const productsMap = {};
      fetchedCategories.forEach((category) => {
        productsMap[category._id] = [];
      });

      // Fetch products for each category
      const productsPromises = fetchedCategories.map((category) =>
        getProductByCategory(category._id)
          .then((response) => {
            // Add products to their respective category in the map
            if (response.data && Array.isArray(response.data)) {
              productsMap[category._id] = response.data;
            }
            return response;
          })
          .catch((err) => {
            console.error(
              `Error fetching products for category ${category.name}:`,
              err
            );
            return null;
          })
      );

      await Promise.all(productsPromises);
      setProductsByCategory(productsMap);
      console.log(productsMap);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load catalogue data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  // Loading spinner animation
  const LoadingSpinner = () => (
    <div className="flex flex-col justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900 mb-4"></div>
      <p className="text-lg font-poppins text-gray-700">
        Loading our exclusive catalogue...
      </p>
    </div>
  );

  // Error message component
  const ErrorMessage = ({ error, retryFetch }) => (
    <div className="text-center p-8">
      <p className="text-red-600 mb-4">{error || "Something went wrong"}</p>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full mx-auto py-12 px-24 font-serif bg-[#F5F4F0]">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-montaga text-black mb-12">
          Bespoke Elegance – Tailored to Perfection
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-3/4 max-sm:w-full">
          {/* Premium Fabrics Section */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-16 h-16 flex-shrink-0">
              <img src={catalogue1} alt="Premium Fabrics" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-poppins mb-2">
                Premium Fabrics
              </h2>
              <p className="font-poppins text-sm">
                Finest Italian wool, linen, suede, velvet, and 100% cotton
                shirting from John Cavendish, Versilli, Gucci.ba, Soktas, Loro
                Piana, Marzoni and more.
              </p>
            </div>
          </div>

          {/* Custom Styles & Details Section */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-16 h-16 flex-shrink-0">
              <img src={catalogue2} alt="Custom Styles" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-poppins mb-2">
                Custom Styles & Details
              </h2>
              <p className="font-poppins text-sm">
                Single & double-breasted suits, peak & notch lapels, monograms,
                custom linings, shawl lapels, functional cuffs, contrast
                stitching, and personalized buttons.
              </p>
            </div>
          </div>

          {/* Expert Tailoring Section */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-16 h-16 flex-shrink-0">
              <img src={catalogue3} alt="Expert Tailoring" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-poppins mb-2">
                Expert Tailoring
              </h2>
              <p className="font-poppins text-sm">
                Choose from fully fused suits, floating canvas handmade suits,
                shirts, and half-lining jackets for unmatched quality and
                comfort.
              </p>
            </div>
          </div>

          {/* Textures & Patterns Section */}
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-16 h-16 flex-shrink-0">
              <img src={catalogue4} alt="Textures & Patterns" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-poppins mb-2">
                Textures & Patterns
              </h2>
              <p className="font-poppins text-sm">
                Explore plain, checks, stripes, herringbone, twill, Oxford
                weave, birdseye, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Catalogue */}
      <div className="mt-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-montaga text-black text-center mb-6 sm:mb-8 md:mb-10">
          Discover our Catalogue
        </h2>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-8">
            {categories.map((category) => (
              <div key={category._id} className="mb-12">
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="text-left text-lg sm:text-xl font-semibold text-gray-900 font-poppins mb-4 focus:outline-none max-sm:px-4"
                >
                  {category.name}
                </button>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-sm:gap-8 max-sm:px-4">
                  {productsByCategory[category._id] &&
                  productsByCategory[category._id].length > 0 ? (
                    productsByCategory[category._id].map((product) => (
                      <div
                        key={product._id}
                        className="aspect-square overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
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
                    ))
                  ) : (
                    <div className="aspect-square overflow-hidden bg-gray-100 shadow-sm">
                      <img
                        src={category.image?.url || "/api/placeholder/240/300"}
                        alt={category.name || "Category image"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalogue;
