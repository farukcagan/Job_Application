import React from "react";


const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-300 py-6 fixed bottom-0 left-0 right-0">
      <div className="flex flex-col lg:flex-row justify-between items-start max-w-screen-xl mx-auto px-4">
        <p className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">ACME</p>
        <div className="w-full max-w-lg mb-4 lg:mb-0">
          <h5 className="text-xl font-bold text-gray-800 mb-2">
            Ready to get started?
          </h5>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo.
          </p>
        </div>
        <div className="flex flex-col items-start lg:items-end self-end">
          <div className="flex space-x-4">
            <a href="/privacy" className="text-gray-600 hover:underline">
              © 2010 — 2024 Privacy Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
