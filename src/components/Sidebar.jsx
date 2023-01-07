import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import { setUser, setUserID } from "../redux/features/userSlice";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { FaHistory, FaUserCircle, FaHeart } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { RiCloseLine, RiLogoutCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logo } from "../assets";
import Logo from "../assets/SpotifyLogoGreen.png";

// console.log(userInfo);
const links = [
  { name: "Discover", to: "/discover", icon: HiOutlineHome },
  { name: "Around You", to: "/around-you", icon: HiOutlinePhotograph },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];
const items = [
  {
    label: (
      <NavLink
        key="Login"
        to="/userhistory"
        className="flex flex-row justify-start items-center text-sm font-medium text-black"
      >
        <FaHistory className="w-6 h-6 mr-2" />
        History
      </NavLink>
    ),
    key: "1",
  },
  {
    label: (
      <NavLink
        key="Profile"
        to="/userprofile"
        className="flex flex-row justify-start items-center text-sm font-medium text-black"
      >
        <FaUserCircle className="w-6 h-6 mr-2" />
        Profile
      </NavLink>
    ),
    key: "2",
  },
  {
    label: (
      <NavLink
        key="Favorite"
        to="/favorite"
        className="flex flex-row justify-start items-center text-sm font-medium text-black"
      >
        <FaHeart className="w-6 h-6 mr-2" />
        Favorite song
      </NavLink>
    ),
    key: "3",
  },
];
const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-white"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(setUser(null));
    dispatch(setUserID(null));
    navigate(`/login`);
  };
  // console.log(userInfo);
  return (
    <>
      <div className="bg-[#000000] md:flex hidden flex-col w-[240px] py-10 px-4 ">
        <img src={Logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
        {userInfo != null ? (
          <div>
            <div
              className="flex flex-row justify-start items-center text-sm font-medium text-gray-400 hover:text-green-500 my-8 cursor-pointer"
              onClick={logOut}
            >
              <RiLogoutCircleLine className="w-6 h-6 mr-2" />
              <div>Log-Out</div>
            </div>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
              arrow
              className="bg-green-500"
            >
              <Button
                className="text-green-500 hover:text-green-500"
                size="large"
              >
                {userInfo.full_name}
              </Button>
            </Dropdown>
          </div>
        ) : (
          <NavLink
            key="Login"
            to="/login"
            className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-white"
          >
            <IoMdLogIn className="w-6 h-6 mr-2" />
            Login
          </NavLink>
        )}
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#121212] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={Logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
        {userInfo ? (
          <div>
            <div
              className="flex flex-row justify-start items-center text-sm font-medium text-gray-400 hover:text-green-500 pb-4"
              onClick={logOut}
            >
              <RiLogoutCircleLine className="w-6 h-6 mr-2" />
              <div>Log-Out</div>
            </div>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomLeft"
              arrow
              className="bg-green-500"
            >
              <Button
                className="text-green-500 hover:text-green-500"
                size="large"
              >
                {userInfo.user_name}
              </Button>
            </Dropdown>
          </div>
        ) : (
          <NavLink
            key="Login"
            to="/login"
            className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-white"
          >
            <IoMdLogIn className="w-6 h-6 mr-2" />
            Login
          </NavLink>
        )}
      </div>
    </>
  );
};

export default Sidebar;
