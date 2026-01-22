import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContenxt';
import { useLocation, useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

const SideMenu = () => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
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
      setSideMenuData(
        user.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20 overflow-y-auto">
      <div className="flex flex-col items-center justify-between mb-7 pt-5">
        <div className="relative">
          <img
            src={user?.profileImageUrl || '/default-avatar.png'}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border bg-slate-200"
          />
        </div>

        {user?.role === 'admin' && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium mt-3">
          {user?.name || ''}
        </h5>

        <p className="text-[12px] text-gray-500">
          {user?.email || ''}
        </p>
      </div>

      <div className="flex flex-col">
        {sideMenuData.map((item, index) => {
          const isLogout = item.path === 'logout';
          const isActive =
            !isLogout &&
            (location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`));

          return (
            <button
              key={index}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 mb-1 cursor-pointer transition ${
                isActive
                  ? 'bg-gray-100 text-primary border-r-4 border-primary'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
              }`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className={`text-xl ${isActive ? 'text-primary' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
