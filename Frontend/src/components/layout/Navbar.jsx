import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';
import ThemeToggle from '../ThemeToggle';

const Navbar = ({activeMenu}) => {
  const [openSideMenu , setOpenSideMenu] = useState(false);
  
  return (
    <div className="flex items-center justify-between bg-white dark:bg-dark-surface border-b border-gray-200/50 dark:border-dark-border py-4 px-6 sticky top-0 z-30 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button 
          className="block min-[1080px]:hidden text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        
        {/* Mobile logo */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text min-[1080px]:hidden">Task Manager</h2>
        
        {/* Page title */}
        <h1 className="hidden min-[1080px]:block text-xl font-semibold text-gray-900 dark:text-dark-text">
          {activeMenu || 'Dashboard'}
        </h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>

      {/* Mobile sidebar */}
      {openSideMenu && (
        <div className="fixed inset-0 top-[61px] z-40 min-[1080px]:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpenSideMenu(false)} />
          <div className="relative">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar