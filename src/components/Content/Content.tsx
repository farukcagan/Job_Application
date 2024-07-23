import React from "react";

interface ContentProps {}

const Content: React.FC<ContentProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-6">
      <h3 className="text-4xl font-bold text-black">
        Best Position Ever Found
      </h3>
      <h6 className="mt-3 font-bold text-black text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </h6>
    </div>
  );
};

export default Content;
