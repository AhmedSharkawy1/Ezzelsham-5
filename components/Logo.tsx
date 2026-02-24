
import React from 'react';

interface LogoProps {
  className?: string;
  src?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-full h-full", src }) => {
  return (
    <img 
      src={src || "https://8upload.com/image/027eaa4c3f6cfb23/ChatGPT_Image_Jan_23__2026__12_33_29_AM.png"} 
      alt="شعار عز الشام" 
      className={`${className} object-cover scale-110`}
      loading="eager"
    />
  );
};

export default Logo;
