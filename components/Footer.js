import React from 'react';



const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <footer className="py-4 px-1 bg-gray-700 items-center text-white mt-5">
        <h1 className="text-center items-center"><span className="text-red-500 font-bold">Share it</span> by MrRocca all rights reserved &copy;{year}</h1>
        </footer>
     );
}
 
export default Footer;