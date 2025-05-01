// ContactForm.jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    // You could add form validation here as well
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-4 bg-white border border-gray-700 text-black focus:outline-none focus:border-white"
          required
        />
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-6">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-4 bg-white border border-gray-700 text-black focus:outline-none focus:border-white"
          required
        />
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-4 bg-white border border-gray-700 text-black focus:outline-none focus:border-white"
          required
        />
      </div>
      
      <div className="mb-6">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows="5"
          className="w-full p-4 bg-white border border-gray-700 text-black focus:outline-none focus:border-white resize-none"
          required
        ></textarea>
      </div>
      
      <button
        type="submit"
        className="bg-white text-black px-8 py-4 border border-gray-700 hover:bg-gray-600 focus:outline-none transition-colors"
      >
        Send Now
      </button>
    </form>
  );
};

export default ContactForm;