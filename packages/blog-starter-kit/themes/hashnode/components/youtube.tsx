import React from 'react';
import Image from 'next/image';


const YouTubeButton = () => {
  return (
    <a
      href="https://www.youtube.com/@subhahu"
      target="_blank"
      rel="noopener noreferrer"
      className="mr-2 inline-flex items-center justify-center w-14 h-14 text-white rounded-full hover:bg-red-700 transition-all"
    >
      <Image
  src="/YouTube_icon_%282013-2017%29.png"
  alt="YouTube"
  width={56}
  height={56}
  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
/>
    </a>
  );
};

export default YouTubeButton;
