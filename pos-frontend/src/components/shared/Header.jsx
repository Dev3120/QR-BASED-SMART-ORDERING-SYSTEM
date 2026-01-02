import React, { useState } from 'react'
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";
import { IoLogOut } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';

const Header = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
      navigate("/auth");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Sample notifications
  const notifications = [
    { id: 1, title: "New Order", message: "Table 5 placed a new order", time: "2 min ago", type: "order" },
    { id: 2, title: "Order Ready", message: "Order #102 is ready to serve", time: "5 min ago", type: "ready" },
    { id: 3, title: "Table Booked", message: "Table 3 has been reserved", time: "10 min ago", type: "booking" },
  ];

  return (
    <header className="flex justify-between items-center py-4 bg-[#1a1a1a]">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img src={logo} className="h-8 w-8" alt="restro logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5]">Restro</h1>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-4 bg-[#1f1f1f] px-5 py-2 rounded-[15px] w-[500px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-[#1f1f1f] outline-none text-[#f5f5f5] px-2 py-1 rounded-md"
        />
      </div>

      {/* LOGGED USER DETAILS */}
      <div onClick={() => navigate("/dashboard")} className="flex items-center gap-4 cursor-pointer">
        {userData.role === "Admin" && (
          <div onClick={() => navigate("/dashboard")} className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
            <MdDashboard className="text-[#f5f5f5] text-2xl" />
          </div>
        )}

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications(!showNotifications);
            }}
            className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer relative"
          >
            <FaBell className="text-[#f5f5f5] text-2xl" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#2a2a2a] rounded-xl shadow-2xl border border-gray-700 z-50">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-white font-bold text-lg">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 border-b border-gray-700 hover:bg-[#333] cursor-pointer transition"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-white font-semibold text-sm">{notif.title}</h4>
                        <span className="text-xs text-gray-400">{notif.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{notif.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    No new notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold">{userData.name || "TEST USER"}</h1>
            <p className="text-xs text-[#ababab] font-medium">{userData.role || "ROLE"}</p>
          </div>
          <IoLogOut
            onClick={handleLogout}
            className="text-[#f5f5f5] ml-2"
            size={40}
          />
        </div>
      </div>


    </header>
  )
}

export default Header