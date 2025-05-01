import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import banner from "../assets/home1.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import brand1 from "../assets/brand1.png";
import brand2 from "../assets/brand2.png";
import brand3 from "../assets/brand3.png";
import brand4 from "../assets/brand4.png";
import brand5 from "../assets/brand5.png";
import brand6 from "../assets/brand6.png";
import brand7 from "../assets/brand7.png";
import brand8 from "../assets/brand8.png";
import videoBanner from "../assets/banner.mp4";
import { getAllCategories } from "../api/api";

function Home() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getAllCategories();
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const features = [
    {
      icon: icon1,
      title: "Custom-made suits tailored to your style and fit.",
    },
    {
      icon: icon2,
      title: "Expert craftsmanship with fast turnaround within 24 hours",
    },
    {
      icon: icon3,
      title: "Luxury suits delivered to your location.",
    },
  ];

  const brands = [
    { name: "Loro Piana", logo: brand1 },
    { name: "Scabal", logo: brand2 },
    { name: "Vitale Barberis Canonico", logo: brand3 },
    { name: "Piacenza", logo: brand4 },
    { name: "Soktas", logo: brand5 },
    { name: "Vercelli", logo: brand6 },
    { name: "Mozzo", logo: brand7 },
    { name: "Grado", logo: brand8 },
  ];

  const testimonials = [
    {
      quote:
        "The attention to detail and quality of my suit exceeded my expectations. I felt confident and stylish at my event!",
      author: "John Doe",
      position: "CEO, Fashion Co.",
    },
    {
      quote:
        "Impeccable craftsmanship and the perfect fit. Will definitely return for my next suit.",
      author: "Michael Smith",
      position: "Marketing Director",
    },
    {
      quote:
        "The fabric quality is outstanding. These suits are truly worth every penny.",
      author: "David Johnson",
      position: "Finance Executive",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Handle category click - navigate to single-catalogue page
  const handleCategoryClick = (categoryId) => {
    navigate(`/single-catalogue/${categoryId}`);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="">
        <img src={banner} alt="" />
      </div>

      {/* Section */}
      <div className="flex flex-col items-center w-full w-[81%] max-sm:w-[100%] p-8 bg-[#F5F4F0] shadow-sm mt-10">
        {/* Header */}
        <div className="text-center mb-6 w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-montaga mb-6">
            Looking for the best men's tailoring shop in Dubai?
          </h1>
          <p className="text-sm md:text-base font-poppins max-w-4xl mx-auto">
            At Ramla Style Italia, we provide personalized consultations to
            match your unique style and preferences. Experience expertly crafted
            bespoke suits, tailored to perfection—
            <span className="font-bold">delivered within just 24 hours.</span>
          </p>
        </div>

        {/* CTA Button */}
        <button
          className="bg-black text-white px-6 py-2 mb-8 hover:bg-gray-800 transition duration-300 text-sm md:text-base"
          onMouseEnter={() => setIsHovered("cta")}
          onMouseLeave={() => setIsHovered(null)}
        >
          Explore Now
        </button>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {loading ? (
            <div className="col-span-4 flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#581719]"></div>
          </div>
          ) : error ? (
            <div className="col-span-4 text-center py-8 text-red-500">{error}</div>
          ) : (
            categories.map((category) => (
              <div
                key={category._id}
                className="flex flex-col cursor-pointer"
                onMouseEnter={() => setIsHovered(category._id)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => handleCategoryClick(category._id)}
              >
                <div className="relative overflow-hidden rounded-lg mb-2 w-full">
                  <img
                    src={category.image.url}
                    alt={category.name}
                    className={`w-52 h-60 md:h-60 object-contain transition-transform duration-500 ${
                      isHovered === category._id ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
                <p className="font-semibold text-center font-poppins text-sm md:text-base">
                  {category.name}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Video */}
      <VideoPlayer videoSrc={videoBanner} />

      {/* Section */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center"
            >
              <img src={feature.icon} className="w-10 mr-4" alt="" />
              <div>
                <h3 className="font-poppins text-md">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl px-4 py-8">
        {/* Premium Fabric Brands */}
        <div className="mb-16 w-full">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montaga text-center text-[#581719] mb-10">
            Premium Fabric Brands
          </h2>
          <div className="bg-[#F5F4F0] p-14 rounded-lg w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-24">
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-16 transition-transform hover:scale-105"
                >
                  <div>
                    <img src={brand.logo} alt={brand.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montaga text-center text-[#581719] mb-10">
            Testimonials
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm relative">
              <div className="text-4xl text-gray-300 absolute top-4 left-4">
                "
              </div>
              <div className="pt-6 pb-2">
                <p className="text-center text-gray-800">
                  "{testimonials[currentTestimonial].quote}"
                </p>
              </div>
              <div className="text-center mt-4">
                <h4 className="font-medium">
                  {testimonials[currentTestimonial].author}
                </h4>
                <p className="text-sm text-gray-600">
                  {testimonials[currentTestimonial].position}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;