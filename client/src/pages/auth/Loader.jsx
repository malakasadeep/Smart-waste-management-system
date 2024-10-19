import React from "react";
import { PuffLoader } from "react-spinners"; // Install via npm: react-spinners

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PuffLoader color="#54C392" size={60} />
    </div>
  );
};

export default Loader;
