import React from 'react';
import brandLogoTransparentWebp from '../assets/images/brand_logo_transparent.webp';
import brandLogoTransparentPng from '../assets/images/brand_logo_transparent.png';

interface UpthrustLogoProps {
  className?: string;
  imgClassName?: string;
}

export const UpthrustLogo: React.FC<UpthrustLogoProps> = ({
  className = '',
  imgClassName = 'h-8 sm:h-9 w-auto object-contain',
}) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <picture>
        <source srcSet={brandLogoTransparentWebp} type="image/webp" />
        <img
          src={brandLogoTransparentPng}
          alt="Upthrust"
          className={`${imgClassName} mix-blend-multiply filter contrast-125`}
          loading="eager"
          decoding="async"
          width="180"
          height="36"
        />
      </picture>
    </div>
  );
};
