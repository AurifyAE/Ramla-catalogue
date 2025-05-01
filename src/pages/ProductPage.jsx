import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import BreadcrumbsNav from "../components/Breadcrumbs";
import ContactForm from "../components/ContactForm";
import { getProduct } from "../api/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductPage = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    description: "",
    images: [],
    price: 0,
    category: { name: "" }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await getProduct(id);
        
        // console.log(response)
        if (!response) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        const data = await response.data;
        
        setProduct({
          name: data.name,
          sku: data._id, // Using _id as SKU
          description: data.description,
          images: data.image.map(img => img.url),
          price: data.price,
          category: data.category
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const breadcrumbPaths = [
    { name: "Home", url: "/" },
    { name: "Catalogue", url: "/catalogue" },
    { name: product.category?.name || "Category", url: `/single-catalogue/${product.category?._id || ""}` },
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
        <div className="flex flex-col space-y-14">
          {/* Thumbnails on left */}
          <div className="flex flex-row space-x-4">
            {product.images.length > 0 && (
              <>
                <div className="w-20 h-80">
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={3}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    direction="vertical"
                    className="h-full"
                  >
                    {product.images.map((imageUrl, index) => (
                      <SwiperSlide
                        key={index}
                        className="border rounded overflow-hidden"
                      >
                        <img
                          src={imageUrl}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-contain cursor-pointer"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Main image */}
                <div className="flex-1 h-[400px] w-[500px] bg-gray-100 rounded-xl">
                  <Swiper
                    spaceBetween={10}
                    thumbs={{
                      swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                          ? thumbsSwiper
                          : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="w-full h-full rounded-lg object-contain"
                  >
                    {product.images.map((imageUrl, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={imageUrl}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </>
            )}
            
            {product.images.length === 0 && (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>
          <ContactForm />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-poppins font-semibold text-black">
            {product.name}
          </h1>
          
          <p className="text-sm font-poppins text-black mt-1">
            SKU: {product.sku}
          </p>
          
          <div className="mt-4">
            <p className="text-2xl font-poppins font-medium text-black">
              AED {product.price?.toLocaleString()}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-md font-poppins text-gray-900">Description</h3>
            <p className="mt-2 font-poppins text-sm text-gray-600">
              {product.description}
            </p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-md font-poppins text-gray-900">Category</h3>
            <p className="mt-2 font-poppins text-sm text-gray-600">
              {product.category?.name || 'Not categorized'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;