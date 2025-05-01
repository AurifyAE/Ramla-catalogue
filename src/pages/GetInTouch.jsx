import React from "react";
import whatsappIcon from "../assets/whatsapp.png";
import ContactForm from "../components/ContactForm";

function GetInTouch() {
  return (
    <div className="flex flex-col w-full">
      <div className="">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.700850177936!2d103.82983807457536!3d1.3656487614118867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da173db5c4c04b%3A0x10b0c93cb8d258a7!2s42%20Jln%20Senang%2C%20Singapore%20418220!5e0!3m2!1sen!2ssg!4v1714442432606!5m2!1sen!2ssg"
          className="w-full h-[650px] max-sm:h-[350px] border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="flex justify-center my-8">
        <a
          href="https://wa.me/+6512345678"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center border border-black py-2 px-5 max-sm:px-2"
        >
          <span className="text-lg max-sm:text-sm font-poppins font-[500] mr-4">
            Connect On Whatsapp
          </span>
          <img src={whatsappIcon} alt="WhatsApp Icon" className="w-10 h-10 max-sm:w-7 max-sm:h-7" />
        </a>
      </div>
      <div className="flex justify-center w-full px-4 mb-12">
        <div className="w-full md:w-3/4 lg:w-1/2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default GetInTouch