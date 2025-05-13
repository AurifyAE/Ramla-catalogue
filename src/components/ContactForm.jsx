import React, { useState } from "react";
import { sendEmailEnquiry } from "../api/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    telephone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEmailEnquiry({
        name: formData.firstName,
        email: formData.email,
        phone: formData.telephone,
        message: formData.message,
        productDetails: formData.productDetails || [],
      });

      setSubmitStatus("success");
      setTimeout(() => {
        resetForm();
      }, 2000); // Reset after 2 seconds on success
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      email: "",
      telephone: "",
      message: "",
    });
    setSubmitStatus(null);
  };

  return (
    <div className="w-full mx-auto px-0">
      {submitStatus === "success" ? (
        <div className="text-center py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto text-green-500 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 className="text-lg mb-2">Thank You!</h3>
          <p className="text-sm">
            Your enquiry has been submitted successfully.
          </p>
        </div>
      ) : submitStatus === "error" ? (
        <div className="text-center py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto text-red-500 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-lg mb-2">Submission Failed</h3>
          <p className="mb-3 text-sm">
            There was an error submitting your enquiry. Please try again.
          </p>
          <button
            onClick={() => setSubmitStatus(null)}
            className="bg-white text-black py-1.5 px-5 text-sm hover:bg-gray-200"
          >
            Try Again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 sm:p-4 bg-white border border-gray-700 text-black focus:outline-none focus:border-white text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 sm:p-4 bg-white border border-gray-700 text-black focus:outline-none focus:border-white text-sm sm:text-base"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 sm:p-4 bg-white border border-gray-700 text-black focus:outline-none focus:border-white text-sm sm:text-base"
              required
            />
          </div>

          <div className="mb-4">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="4"
              className="w-full p-3 sm:p-4 bg-white border border-gray-700 text-black focus:outline-none focus:border-white resize-none text-sm sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-white text-black px-6 py-2 sm:px-8 sm:py-3 border border-gray-700 text-sm font-poppins ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Send Now"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
