import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContenxt';
import { useLocation, useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { LuChevronLeft, LuLogOut } from 'react-icons/lu';

const SideMenu = () => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      const menuData = user.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA;
      setSideMenuData(menuData.filter(item => item.path !== 'logout'));
    }
  }, [user]);

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} h-screen bg-white dark:bg-dark-surface border-r border-gray-200/50 dark:border-dark-border sticky top-0 z-20 flex flex-col transition-all duration-300`}>
      {/* Logo Header */}
      <div className="flex items-center justify-between py-4 px-4 border-b border-gray-200/50 dark:border-dark-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          {!collapsed && <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">Task Manager</h2>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 dark:text-dark-text-secondary hover:text-gray-600 dark:hover:text-dark-text transition"
        >
          <LuChevronLeft className={`text-xl transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        {!collapsed && (
          <p className="text-[11px] font-medium text-gray-400 dark:text-dark-text-secondary uppercase tracking-wider px-6 mb-2">
            Main Menu
          </p>
        )}
        <div className="flex flex-col">
          {sideMenuData.map((item, index) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

            return (
              <button
                key={index}
                className={`w-full flex items-center gap-3 text-[14px] py-2.5 px-6 cursor-pointer transition ${
                  isActive
                    ? 'bg-green-50 dark:bg-primary/20 text-primary border-l-3 border-primary'
                    : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-surface-2 hover:text-primary'
                }`}
                onClick={() => handleClick(item.path)}
                title={collapsed ? item.label : ''}
              >
                <item.icon className={`text-lg ${isActive ? 'text-primary' : 'text-gray-500 dark:text-dark-text-secondary'}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-gray-200/50 dark:border-dark-border p-4">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={user?.profileImageUrl || '/default-avatar.png'}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-dark-border bg-slate-200 dark:bg-dark-surface-2"
          />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-medium text-gray-900 dark:text-dark-text truncate">
                {user?.name || ''}
              </h5>
              <p className="text-xs text-gray-500 dark:text-dark-text-secondary truncate">
                {user?.role === 'admin' ? 'Admin' : 'Member'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="border-t border-gray-200/50 dark:border-dark-border p-2">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 text-[14px] py-2.5 px-4 text-gray-600 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-surface-2 hover:text-red-500 rounded-lg transition ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Log out' : ''}
        >
          <LuLogOut className="text-lg" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
