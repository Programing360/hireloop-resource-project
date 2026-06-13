import Footer from "@/component/Footer";
import CustomNavbar from "@/component/Navbar";
import React from "react";

const publicLayout = ({ children }) => {
  return (
    <div>
      <header>
        <CustomNavbar></CustomNavbar>
      </header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default publicLayout;
