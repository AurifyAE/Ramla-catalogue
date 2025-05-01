import React from "react";
import beposke1 from "../assets/beposke/beposke1.png";
import beposke2 from "../assets/beposke/beposke2.png";
import beposke3 from "../assets/beposke/beposke3.png";
import beposke4 from "../assets/beposke/beposke4.png";
import beposke5 from "../assets/beposke/beposke5.png";
import beposke6 from "../assets/beposke/beposke6.png";
import bsp1 from "../assets/beposke/bsp1.png";
import bsp2 from "../assets/beposke/bsp2.png";
import bsp3 from "../assets/beposke/bsp3.png";
import bsp4 from "../assets/beposke/bsp4.png";

function Beposke() {
  const steps = [
    {
      number: 1,
      title: "Personalized Consultation",
      description:
        "Our tailoring experts meet with you to discuss your preferred style, fabric choices, and specific requirements. During this consultation, we'll help you select the perfect fabric, design, and features to deliver a truly custom fit that perfectly suits your unique proportions. Your journey starts here.",
      image: beposke1,
    },
    {
      number: 2,
      title: "Precision Measurements",
      description:
        "After finalizing the design, we take detailed measurements to ensure your suit fits perfectly. This comprehensive process involves a trained expert who carefully records all measurements needed to create yours.",
      image: beposke2,
    },
    {
      number: 3,
      title: "Custom Pattern Making",
      description:
        "Using your measurements, we create a unique paper pattern that serves as the blueprint for your suit. Our master tailors analyze every detail of your measurements to design a pattern that will harmonize with your body's natural proportions.",
      image: beposke3,
    },
    {
      number: 4,
      title: "First Fitting (Baste Fit)",
      description:
        "In this initial fitting, fabric is partially assembled with basic stitching to check the overall shape and fit. This is a crucial step where we make preliminary adjustments, noted so we can track all crucial details for perfection.",
      image: beposke4,
    },
    {
      number: 5,
      title: "Second Fitting",
      description:
        "At this stage, we incorporate initial pattern cut to the suit and construct the main elements. You'll try on the garment in a near-to-the-finished look. Here's your final opportunity to make minor fit or style tweaks.",
      image: beposke5,
    },
    {
      number: 6,
      title: "Final Fitting & Delivery",
      description:
        "Your completed suit is presented for final approval. Every detail is checked for perfection - from buttons to buttonholes, from pockets to lapels. We ensure your suit is delivered, ready to make a statement.",
      image: beposke6,
    },
  ];

  const bspImages = [
    { image: bsp1 },
    { image: bsp2 },
    { image: bsp3 },
    { image: bsp4 },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-10 px-4 sm:px-8">
      <div className="max-w-7xl w-full p-4 bg-white">
        <div className="text-center mb-8 font-montaga">
          <h1 className="text-2xl sm:text-3xl font-normal text-gray-800">
            Our Bespoke Tailoring Process -
          </h1>
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-800">
            Crafting the Perfect Suit
          </h2>
        </div>

        <div className="space-y-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col md:flex-row items-center pb-8"
            >
              <div
                className={`w-full md:w-1/2 p-4 ${
                  step.number % 2 === 0 ? "md:order-2" : ""
                }`}
              >
                <h3 className="text-lg sm:text-xl font-normal text-gray-700 mb-1 font-montaga">
                  Step {step.number}
                </h3>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-poppins">
                  {step.title}
                </h4>
                <p className="text-gray-600 leading-relaxed font-poppins text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
              <div
                className={`w-full md:w-1/2 p-4 ${
                  step.number % 2 === 0 ? "md:order-1" : ""
                }`}
              >
                <img
                  src={step.image}
                  alt={`Step ${step.number}: ${step.title}`}
                  className="w-full max-w-md h-64 sm:h-80 object-cover rounded shadow-md mx-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section */}
      <div className="flex flex-col justify-center items-center bg-[#F5F4F0] w-full sm:w-[90%] md:w-[75%] py-12 px-6 sm:px-16 mt-10 mb-10 rounded-md">
        <h2 className="text-xl sm:text-2xl font-montaga text-center mb-8">
          An unrivalled swatch book comprised of the finest fabrics
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10">
          {bspImages.map((img, index) => (
            <img
              key={index}
              src={img.image}
              alt=""
              className="w-full object-cover rounded"
            />
          ))}
        </div>

        <div className="font-poppins max-w-3xl text-center text-sm sm:text-base px-2">
          <p>
            Customers are invited to explore our fabric swatch books in-store
            and choose from a wide selection of premium materials for their
            bespoke suits.
          </p>
        </div>
      </div>

      {/* Booking */}
      <div className="flex flex-col justify-center items-center max-w-3xl max-sm:max-w-[90%] mb-24 px-4">
        <h2 className="font-poppins text-xl sm:text-2xl text-center mb-6">
          Book an appointment today and discover the finest custom made suits
          delivered in 24 Hours
        </h2>
        <button className="font-poppins bg-black text-white px-6 py-2 text-sm sm:text-base">
          Schedule a Visit Now
        </button>
      </div>
    </div>
  );
}

export default Beposke;
