import React from 'react';
import logo from '@/imgs/logo.png';
import Image from 'next/image';

const Logo = () => {
  return (
    <div>
      <div className="rounded-full bg-gradient-mysteria p-0.5">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-background/80">
          <Image
            src={logo}
            alt="Mysteria Logo"
            className="h-8 w-8 text-mysteria-cyan"
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;
