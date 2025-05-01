import React, { useState, useEffect } from "react";
import { Search, ArrowLeft, ShoppingBag } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProducts } from "../api/api";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchProducts(initialQuery);
  }, [initialQuery]);

  const fetchProducts = async (query) => {
    const trimmedQuery = query?.trim() || "";

    if (!trimmedQuery) {
      setProducts([]);
      setTotalItems(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await searchProducts(trimmedQuery);

      if (Array.isArray(response.data)) {
        setProducts(response.data);
        setTotalItems(response.data.length);
      } else {
        setProducts([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Search error:", error);
      setProducts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery?.trim() || "";

    if (!trimmedQuery) {
      alert("Please enter a search term");
      return;
    }

    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    fetchProducts(trimmedQuery);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header with search bar */}
      <div className="sticky top-0 z-10 bg-white shadow px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={goBack}
            className="flex items-center text-gray-700 hover:text-black transition-colors self-start sm:self-center"
          >
            <ArrowLeft size={18} className="mr-2" />
            <span className="font-poppins">Back</span>
          </button>

          <div className="">
            <form
              onSubmit={handleSearch}
              className="flex items-center justify-end font-poppins"
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full md:w-72 p-2 border border-gray-300 rounded-l focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="bg-black text-white p-2 rounded-r"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
        {/* Search summary */}
        {initialQuery && !loading && (
          <div className="mb-6">
            {products.length > 0 ? (
              <p className="font-poppins text-gray-600 font-medium">
                Found {totalItems} results for "
                <span className="text-blue-600">{initialQuery}</span>"
              </p>
            ) : (
              <p className="font-poppins text-gray-600 font-medium">
                No results found for "
                <span className="text-blue-600">{initialQuery}</span>"
              </p>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Empty states */}
        {!loading && !initialQuery && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search size={48} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Start your search
            </h2>
            <p className="font-poppins text-gray-500 max-w-md">
              Enter a keyword in the search box above to find products
            </p>
          </div>
        )}

        {!loading && initialQuery && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag size={48} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              No products found
            </h2>
            <p className="font-poppins text-gray-500 max-w-md">
              We couldn't find any products matching "{initialQuery}". Try a
              different search term.
            </p>
          </div>
        )}

        {/* Product grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product._id} className="group">
                <a
                  href={`/view-product/${product._id}`}
                  className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={
                        product.image?.[0]?.url || "/api/placeholder/300/300"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
