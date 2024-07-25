import React from "react";
import Select from "react-select";
import { FiSearch } from "react-icons/fi";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option2", label: "Option 2" },
  { value: "option2", label: "Option 2" },
];

function BasicFilter() {
  return (
    <div className="p-2">
      <div className="flex  rounded-md bg-white w-full p-3 items-center">
        <div className="flex-1">
          <span>Basic Filter</span>
        </div>
        <div className="flex-1 mr-2">
          <Select
            options={options}
            className="w-full"
            classNamePrefix="select"
          />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md py-2 px-4 pl-10 w-full"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default BasicFilter;
