import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white text-black shadow-lg z-50">
      <div className="text-xl font-bold ml-4">
        <a href="/">
          <Image src="/images/logo.png" alt="Logo" width={100} height={70} className="hover:opacity-75 transition-opacity duration-300" />
        </a>
      </div>
      <div className='mr-4'>
        <a href="/login" className="mr-4 text-black hover:text-gray-600">Login</a>
        <a href="/signup" className="text-black hover:text-gray-600">Sign Up</a>
      </div>
    </header>
  );
};

export default Header;
