import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
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
import brand9 from "../assets/brand9.png";
import brand10 from "../assets/brand10.png";
import brand11 from "../assets/brand11.png";
import brand12 from "../assets/brand12.png";
import videoBanner from "../assets/banner.mp4";
import { getAllCategories } from "../api/api";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [brands, setBrands] = useState([
    { name: "Loro Piana", logo: brand1 },
    { name: "Scabal", logo: brand2 },
    { name: "Vitale Barberis Canonico", logo: brand3 },
    { name: "Piacenza", logo: brand4 },
    { name: "Soktas", logo: brand5 },
    { name: "Vercelli", logo: brand6 },
    { name: "Mozzo", logo: brand7 },
    { name: "Grado", logo: brand8 },
    { name: "Canclini", logo: brand9 },
    { name: "Tessitura", logo: brand10 },
    { name: "John", logo: brand11 },
    { name: "Taylor", logo: brand12 },
  ]);

  const row1Brands = brands.slice(0, 6);
  const row2Brands = brands.slice(6, 12);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate image translation based on mouse position
  const calculateTranslation = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Calculate percentage of mouse position relative to window dimensions
    const yPercentage = (mousePosition.y / windowHeight) * 100;
    const xPercentage = (mousePosition.x / windowWidth) * 100;

    // Transform these percentages into translation values (maximum 30px movement)
    const yTranslate = ((yPercentage - 50) / 50) * -60;
    const xTranslate = ((xPercentage - 50) / 50) * -0;

    return { xTranslate, yTranslate };
  };

  const { xTranslate, yTranslate } = calculateTranslation();

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

  // Navigate to single-catalogue page
  const handleCategoryClick = (categoryId) => {
    navigate(`/single-catalogue/${categoryId}`);
  };

  // Navigate to catalogue page
  const handleNavigateToCatalogue = () => {
    navigate("/catalogue");
  };

  // Navigate to get in touch page
  const handleNavigateToGetInTouch = () => {
    navigate("/get-in-touch");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-full h-screen overflow-hidden bg-black">
        {/* Banner Image with Parallax Animation */}
        <div
          className="w-full h-full relative"
          style={{
            transform: `translate(${xTranslate}px, ${yTranslate}px) scale(1.1)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <img
            src={banner}
            alt="Luxury Suit"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-xl text-white">
              <h1 className="text-2xl max-sm:text-2xl md:text-3xl lg:text-4xl font-montaga mb-6">
                Crafted in 24 Hours – Your perfect men's outfits by Ramla Style
                Italia.
              </h1>

              <p className="mb-8 text-gray-200 font-poppins max-sm:text-sm">
                At Ramla Suits in Dubai, we specialize in crafting bespoke
                suits, tuxedos, shirts, and traditional wear tailored to your
                unique style. Experience the luxury of personalized tailoring
                with our expert craftsmanship and premium fabrics.
              </p>

              <button
                className="border-2 border-white px-6 py-3 font-poppins text-white hover:bg-white hover:text-black transition duration-300 max-sm:text-sm max-sm:px-4 max-sm:py-2"
                onClick={handleNavigateToGetInTouch}
              >
                Schedule a Visit Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {/* Section */}
        <div className="flex flex-col items-center w-full w-[81%] max-sm:w-[100%] p-8 bg-[#F5F4F0] shadow-sm mt-10">
          {/* Header */}
          <div className="text-center mb-6 w-full max-sm:px-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-montaga text-black mb-6">
              Looking for the best men's tailoring shop in Dubai?
            </h1>
            <p className="text-sm md:text-base font-poppins max-w-4xl mx-auto">
              At Ramla Style Italia, we provide personalized consultations to
              match your unique style and preferences. Experience expertly
              crafted bespoke suits, tailored to perfection—
              <span className="font-bold">delivered within just 24 hours.</span>
            </p>
          </div>

          {/* CTA Button */}
          <button
            className="bg-black text-white px-6 py-2 mb-8 border hover:bg-transparent hover:text-black hover:border-black text-sm md:text-base"
            onMouseEnter={() => setIsHovered("cta")}
            onMouseLeave={() => setIsHovered(null)}
            onClick={handleNavigateToCatalogue}
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
              <div className="col-span-4 text-center py-8 text-red-500">
                {error}
              </div>
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
                      className={`w-48 h-56 md:h-56 object-contain transition-transform duration-500 ${
                        isHovered === category._id ? "scale-110" : "scale-110"
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
        <div className="max-w-5xl mx-auto px-4 py-8 max-sm:w-[85%]">
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-center max-sm:justify-start"
              >
                <img
                  src={feature.icon}
                  className="w-10 mr-4 max-sm:w-8"
                  alt=""
                />
                <div>
                  <h3 className="font-poppins text-md max-sm:text-sm">
                    {feature.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Fabric Brands */}
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montaga text-center text-[#581719] mb-10 max-sm:mb-6">
            Premium Fabric Brands
          </h2>
          <div className="bg-[#F5F4F0] py-6 md:py-10 lg:py-14 px-4 md:px-6 w-full">
            {/* First row - Modified marquee settings for seamless looping */}
            <div className="mb-16">
              <Marquee
                speed={40}
                direction="left"
                gradient={false}
                pauseOnHover={false}
                loop={0}
                className="overflow-hidden"
              >
                {[...row1Brands, ...row1Brands].map((brand, index) => (
                  <div
                    key={`row1-${index}`}
                    className="flex items-center justify-center h-16 mx-4 overflow-hidden"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-32 h-20 object-contain"
                    />
                  </div>
                ))}
              </Marquee>
            </div>

            {/* Second row - Modified marquee settings for seamless looping */}
            <div>
              <Marquee
                speed={40}
                direction="left"
                gradient={false}
                pauseOnHover={false}
                loop={0}
                className="overflow-hidden"
              >
                {/* Each brand item has reduced margin to close gaps */}
                {[...row2Brands, ...row2Brands].map((brand, index) => (
                  <div
                    key={`row2-${index}`}
                    className="flex items-center justify-center h-16 mx-4 overflow-hidden"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-32 h-20 object-contain"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="flex justify-center items-center px-4 py-8 mt-16">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-montaga text-center text-[#581719] mb-10 max-sm:mb-14">
              Testimonials
            </h2>

            <div className="relative max-w-2xl mx-auto max-sm:w-[70%]">
              {/* Testimonial card */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-md relative h-48 max-sm:h-52">
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

              {/* Navigation buttons on sides with gap */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-12">
                <button
                  onClick={prevTestimonial}
                  disabled={currentTestimonial === 0}
                  className={`p-2 rounded-full border border-[#532732] bg-white ${
                    currentTestimonial === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  aria-label="Previous testimonial"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="#532732"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-12">
                <button
                  onClick={nextTestimonial}
                  disabled={currentTestimonial === testimonials.length - 1}
                  className={`p-2 rounded-full border border-[#532732] bg-white ${
                    currentTestimonial === testimonials.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                  aria-label="Next testimonial"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="#532732"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
