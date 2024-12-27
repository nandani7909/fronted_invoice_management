import React from "react";
import Navbar from "../../components/navbar";

const LayoutWrapper = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default LayoutWrapper;
