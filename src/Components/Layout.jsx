import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <Outlet context={{ searchQuery }} /> {/* Pass searchQuery via context */}
      <Footer />
    </>
  );
};

export default Layout;

