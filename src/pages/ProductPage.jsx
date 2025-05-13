import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import BreadcrumbsNav from "../components/Breadcrumbs";
import EnquiryFormModal from "../components/EnquiryFormModal";
import whatsappIcon from "../assets/whatsapp.png";
import { getProduct, getProductByCategory } from "../api/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    description: "",
    images: [],
    price: 0,
    category: { name: "", _id: "" },
  });
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Add scroll to top effect when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await getProduct(id);

        if (!response) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        const data = await response.data;

        setProduct({
          _id: data._id,
          name: data.name,
          sku: data.sku,
          description: data.description,
          images: data.image.map((img) => img.url),
          price: data.price,
          category: data.category,
        });

        // Once we have the product with category, fetch similar products
        if (data.category && data.category._id) {
          fetchSimilarProducts(data.category._id, data._id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchSimilarProducts = async (categoryId, currentProductId) => {
      try {
        const response = await getProductByCategory(categoryId);
        
        if (response && response.data && Array.isArray(response.data)) {
          // Filter out the current product and limit to 4 products
          const filtered = response.data
            .filter(product => product._id !== currentProductId)
            .slice(0, 4);
          
          setSimilarProducts(filtered);
        }
      } catch (err) {
        console.error("Error fetching similar products:", err);
        // Don't set error state here to avoid disrupting the main product display
        setSimilarProducts([]);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleSimilarProductClick = (productId) => {
    navigate(`/view-product/${productId}`);
    // No need to manually scroll here as the useEffect will handle it
  };

  const breadcrumbPaths = [
    { name: "Home", url: "/" },
    { name: "Catalogue", url: "/catalogue" },
    {
      name: product.category?.name || "Category",
      url: `/single-catalogue/${product.category?._id || ""}`,
    },
    { name: product.name || "Product", url: "#" },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-96">
          <div className="text-red-600 text-xl">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BreadcrumbsNav paths={breadcrumbPaths} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {/* Product Images with SwiperJS */}
        <div className="flex flex-col h-full">
          {/* Thumbnails and Main Image */}
          <div className="flex flex-row space-x-4">
            {product.images.length > 0 && (
              <>
                {/* Thumbnails on left */}
                <div className="w-16 max-sm:w-14 h-64 max-sm:h-56">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    direction="vertical"
                    className="h-full"
                    onSlideChange={(swiper) =>
                      setActiveIndex(swiper.activeIndex)
                    }
                  >
                    {product.images.map((imageUrl, index) => (
                      <SwiperSlide
                        key={index}
                        className={`border overflow-hidden ${
                          activeIndex === index
                            ? "border-2 border-gray-400"
                            : ""
                        }`}
                      >
                        <img
                          src={imageUrl}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Main image */}
                <div className="flex-1 h-[400px] w-[400px] max-sm:h-[250px] max-sm:w-[250px] bg-gray-100 rounded-xl">
                  <Swiper
                    spaceBetween={10}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full h-full"
                    onSlideChange={(swiper) =>
                      setActiveIndex(swiper.activeIndex)
                    }
                  >
                    {product.images.map((imageUrl, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={imageUrl}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </>
            )}

            {product.images.length === 0 && (
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 font-poppins">
                {product.name}
              </h1>

              <p className="text-sm font-poppins text-black mt-1">
                SKU: {product.sku}
              </p>

              <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 font-poppins">
                  Description:
                </h3>
                <p className="mt-2 font-poppins text-sm">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 font-poppins">
                  Category
                </h3>
                <p className="mt-2 font-poppins text-sm">
                  {product.category?.name || "Not categorized"}
                </p>
              </div>
            </div>

            {/* Buttons directly after category section */}
            <div className="flex flex-col sm:flex-row gap-6 mt-6">
              <button
                onClick={() => setIsEnquiryModalOpen(true)}
                className="flex items-center justify-center text-white border border-black py-2 px-4 bg-black hover:bg-transparent hover:text-black max-sm:w-[230px] transition-colors duration-300"
              >
                <span className="text-sm sm:text-base font-poppins font-medium">
                  Send an Enquiry via Email
                </span>
              </button>

              <a
                href="https://wa.me/+6512345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-black py-2 px-4 max-sm:w-[230px]"
              >
                <span className="text-sm sm:text-base font-poppins font-medium mr-2">
                  Connect On WhatsApp
                </span>
                <img
                  src={whatsappIcon}
                  alt="WhatsApp Icon"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Modal */}
      <EnquiryFormModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        product={product}
      />

      {/* You May Also Like Section - Full Width */}
      {similarProducts.length > 0 && (
        <div className="mt-28 max-sm:mt-16">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 font-poppins mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarProducts.map((similarProduct) => (
              <div
                key={similarProduct._id}
                className="w-56 h-56 max-sm:w-40 max-sm:h-40 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => handleSimilarProductClick(similarProduct._id)}
              >
                <img
                  src={
                    similarProduct.image && similarProduct.image.length > 0
                      ? similarProduct.image[0].url
                      : "/api/placeholder/240/300"
                  }
                  alt={similarProduct.name || "Similar product"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;