import React from 'react';
import Image from 'next/image';

const WhatsAppButton = () => {
  return (
    <a
      href="https://chat.whatsapp.com/EYyw0PjaykcDFRFElpkaLt"
      target="_blank"
      rel="noopener noreferrer"
      className="mr-2 inline-flex items-center justify-center w-12 h-12 text-white rounded-full hover:bg-green-600 transition-all"
    >
      <Image
  src="/WhatsApp.svg"
  alt="WhatsApp"
  width={56}
  height={56}
  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
  style={{ objectFit: 'contain' }}
/>
    </a>
  );
};

export default WhatsAppButton;
