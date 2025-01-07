import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://chat.whatsapp.com/EYyw0PjaykcDFRFElpkaLt"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-12 h-12 text-white rounded-full hover:bg-green-600 transition-all"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // WhatsApp logo
        alt="WhatsApp"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mr-2" // Responsive icon size with margin right
      />
    </a>
  );
};

export default WhatsAppButton;
