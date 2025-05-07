import React, { useState, useEffect } from "react";
import { sendEmailEnquiry } from "../api/api";

const EnquiryFormModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    telephone: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  // Reset form data when modal closes or opens
  useEffect(() => {
    if (isOpen) {
      // Pre-fill product name in message if provided
      setFormData({
        firstName: "",
        email: "",
        telephone: "",
        message: "",
      });
      setSubmitStatus(null);
    }
  }, [isOpen, productName]);

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
      // Use the imported API function
      await sendEmailEnquiry({
        name: formData.firstName,
        email: formData.email,
        phone: formData.telephone,
        message: formData.message
      });
      
      setSubmitStatus('success');
      setTimeout(() => {
        resetForm();
        onClose();
      }, 2000); // Close after 2 seconds on success
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus('error');
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

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col md:flex-row relative bg-black text-white p-8 max-w-4xl w-full mx-4">
        {/* Left Column */}
        <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-6 md:mb-0">
          <h2 className="text-xl font-montaga mb-4">Enquiry Form</h2>

          <p className="text-sm font-poppins mb-8">
            Call us on +44 (0)20 7734 5985, or use this form to enquire about
            styling advice and cloths, to book an appointment for a fitting or
            to discuss your needs with one of our cutters.
          </p>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 pl-0 md:pl-4">
          <button
            onClick={handleCancel}
            className="absolute top-6 right-6 text-white hover:text-gray-300"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-xl mb-2">Thank You!</h3>
              <p>Your enquiry has been submitted successfully.</p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl mb-2">Submission Failed</h3>
              <p className="mb-4">There was an error submitting your enquiry. Please try again.</p>
              <button 
                onClick={() => setSubmitStatus(null)} 
                className="bg-white text-black py-2 px-6 text-sm"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full bg-transparent border-b border-white/50 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-white/50 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder="Telephone"
                  className="w-full bg-transparent border-b border-white/50 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  required
                />
              </div>

              <div className="mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What would you like help with?"
                  className="w-full bg-transparent border-b border-white/50 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white resize-none"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-white text-black py-2 px-8 font-poppins text-sm ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Your Enquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryFormModal;