import React, {useEffect} from "react";
import whatsappIcon from "../assets/whatsapp.png";
import ContactForm from "../components/ContactForm";

function GetInTouch() {
  // Add scroll to top effect when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d902.0056387768841!2d55.315644118571555!3d25.269836715976385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d7e4b311da3%3A0x2501cf567951faf1!2sRamla%20style%20Italia%20tailoring%20and%20textiles%20trading%20L.L.C!5e0!3m2!1sen!2sin!4v1746553918978!5m2!1sen!2sin"
          className="w-full h-[650px] max-sm:h-[350px] border-0 rounded-b-[25px]"
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
          <img
            src={whatsappIcon}
            alt="WhatsApp Icon"
            className="w-10 h-10 max-sm:w-7 max-sm:h-7"
          />
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

export default GetInTouch;
