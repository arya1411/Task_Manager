import React, { useContext } from 'react'
import { UserContext } from '../../context/userContenxt'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({children, activeMenu}) => {
  const {user} = useContext(UserContext);
  
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      {user && (
        <>
          {/* Sidebar - Hidden on mobile */}
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
            {/* Top Navbar */}
            <Navbar activeMenu={activeMenu} />
            
            {/* Page Content */}
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardLayout

