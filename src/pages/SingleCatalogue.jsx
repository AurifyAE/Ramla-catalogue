import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import beposkeBanner from "../assets/beposke/beposkeBanner.png";
import { getProductByCategory, getCategory } from "../api/api";

// Hardcoded category descriptions
const categoryDescriptions = {
  bespoke:
    "A bespoke suit is a fully custom-made suit tailored specifically to an individual's measurements, style preferences, and fabric choices. Unlike off-the-rack or made-to-measure suits, bespoke suits are crafted from scratch, ensuring a perfect fit and unique design. This process involves multiple fittings and high-quality craftsmanship, making bespoke suits the ultimate choice for those seeking luxury, elegance, and personalization.",

  tuxedos:
    "A tuxedo is a formal ensemble traditionally worn for evening events, known for its timeless elegance and sophistication. Designed with satin lapels, a bow tie, and often a cummerbund, tuxedos offer a refined silhouette. Whether for black-tie affairs or special occasions, tuxedos are the go-to choice for classic style and sharp detailing that reflects grace, prestige, and formal fashion excellence.",

  "shirts-trousers":
    "Shirts and trousers form the foundation of every gentleman's wardrobe, offering versatility, comfort, and style for both formal and casual settings. Tailored for a clean fit and made from premium fabrics, this category includes crisp shirts and well-cut trousers to elevate everyday dressing. Ideal for business, social gatherings, or daily wear, these essentials deliver elegance and ease with modern sophistication.",

  "ethnic-traditional":
    "Ethnic and traditional wear celebrates heritage, craftsmanship, and cultural elegance through garments like kurtas, sherwanis, and bandhgalas. Each piece is thoughtfully designed with rich fabrics, intricate embroidery, and timeless silhouettes. Perfect for weddings, festivals, and formal events, this category offers a graceful blend of tradition and contemporary flair, embodying pride, identity, and the enduring charm of classic Indian menswear.",
};

// Default image banners for each category
const categoryBanners = {
  bespoke: beposkeBanner,
};

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

  // Function to get the appropriate description based on category
  const getCategoryDescription = (categoryData) => {
    if (!categoryData) return "";

    // First try to match by ID or slug if available
    if (categoryData.slug && categoryDescriptions[categoryData.slug]) {
      return categoryDescriptions[categoryData.slug];
    }

    // Then try to match by name (case insensitive)
    const categoryName = categoryData.name?.toLowerCase();
    if (categoryName) {
      if (categoryName.includes("bespoke"))
        return categoryDescriptions["bespoke"];
      if (categoryName.includes("tuxedo"))
        return categoryDescriptions["tuxedos"];
      if (categoryName.includes("shirt") || categoryName.includes("trouser"))
        return categoryDescriptions["shirts-trousers"];
      if (
        categoryName.includes("ethnic") ||
        categoryName.includes("traditional")
      )
        return categoryDescriptions["ethnic-traditional"];
    }

    // Default description if no match found
    return "Discover our premium collection crafted with meticulous attention to detail and the finest materials. Each piece reflects our commitment to excellence in design, fit, and craftsmanship, ensuring you look and feel your best for any occasion.";
  };

  // Function to get the appropriate banner based on category
  const getCategoryBanner = (categoryData) => {
    if (!categoryData) return beposkeBanner;

    if (categoryData.slug && categoryBanners[categoryData.slug]) {
      return categoryBanners[categoryData.slug];
    }

    const categoryName = categoryData.name?.toLowerCase();
    if (categoryName) {
      if (categoryName.includes("bespoke")) return categoryBanners["bespoke"];
      // Add more category banner matches here
    }

    return beposkeBanner; // Default banner
  };

  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true);

      // Fetch category details
      const categoryResponse = await getCategory(id);
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
      <p className="text-lg font-poppins text-gray-700">
        Loading catalogue items...
      </p>
    </div>
  );

  // Error message component
  const ErrorMessage = () => (
    <div className="flex flex-col justify-center items-center h-64 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-sm w-full max-w-xl">
        <div className="flex items-center mb-3">
          <svg
            className="w-8 h-8 text-red-500 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="text-lg font-semibold text-red-800 font-poppins">
            Unable to Load Category
          </h3>
        </div>
        <p className="text-red-700 mb-4 font-poppins">{error}</p>
        <button
          onClick={retryFetch}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-poppins"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
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
        <div className="text-xl sm:text-2xl md:text-3xl font-montaga text-black mb-10 mt-10">
          <h2>{category ? category.name : "Premium Collection"}</h2>
        </div>
        <p className="font-poppins max-w-6xl text-sm sm:text-base px-6">
          {category
            ? getCategoryDescription(category)
            : "Discover our exclusive collection of premium menswear."}
        </p>
        <img
          src={category ? getCategoryBanner(category) : beposkeBanner}
          className="mt-12 mb-16 max-w-full max-sm:w-[90%]"
          alt={`${category?.name || "Collection"} Banner`}
        />
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <div className="mb-12">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-poppins mb-6 max-sm:px-2">
              {category && category.name === "Bespoke" ? "2 Pcs and 3 Pcs Bespoke Suits" : category.name}
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
                <p className="text-gray-500 font-poppins">
                  No products available in this category yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleCatalogue;
