import React, { useState } from "react";
import { NavLink } from 'react-router-dom'

const Navbar = ({ setSearchQuery }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);// to update the input
    setSearchQuery(value); // Pass search query to parent
  };
  return (
    <div className='bg-[#e3e3e3] w-full py-4 flex flex-wrap text-[#333333] items-center justify-between md:px-auto lg:px-suto gap-5'>
      <h1 className='font-bold text-xl sm:text-2xl mx-auto'><span className='text-[#6200ea]'>&lt;/ </span>PassStore<span className='text-[#6200ea]'> &gt;</span></h1>
      <ul className='list-none flex flex-wrap gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-lg justify-center items-center mx-auto'>
        <NavLink className={(e) => { return e.isActive ? "font-bold underline" : "" }} to="/"><li className='cursor-pointer hover:font-bold hover:underline'>Home</li></NavLink>
        <NavLink className={(e) => { return e.isActive ? "font-bold underline" : "" }} to="/about"><li className='cursor-pointer hover:font-bold hover:underline'>About</li></NavLink>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="border border-[#6200ea] rounded-full px-4 py-2 text-sm w-48"
          placeholder="Search by URL..."
        />
      </ul>
    </div >
  )
}

export default Navbar