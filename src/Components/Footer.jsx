import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 py-3 text-[#333333] text-center w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-10 bg-[#e3e3e3] gap-4'>
        <h1 className='font-bold text-lg md:text-2xl flex flex-col md:flex-row md:justify-between md:items-end'><div><span className='text-[#6200ea]'>&lt;/ </span>PassStore<span className='text-[#6200ea]'> &gt;</span ></div><p className='md:px-5 font-medium text-sm md:text-lg'>Created by Samarth Chawla</p></h1>
        <p className="text-sm md:text-base"> &copy; Copyright 2024</p>
        <a className='flex items-center gap-2 cursor-pointer text-sm md:text-base' href='https://github.com/samarth-chawla' target='_blank'><img src='https://images.seeklogo.com/logo-png/30/2/github-logo-png_seeklogo-304612.png?v=1958564572871810328' className='w-6 md:w-8'></img>GitHub</a>
    </div>
  )
}

export default Footer