import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
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

import { logo } from "../assets";
import Logo from "../assets/SpotifyLogoGreen.png";

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
  {
    type: "divider",
  },
  {
    label: (
      <NavLink
        key="Login"
        to="/login"
        className="flex flex-row justify-start items-center text-sm font-medium text-black"
      >
        <RiLogoutCircleLine className="w-6 h-6 mr-2" />
        LogOut
      </NavLink>
    ),
    key: "4",
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

  return (
    <>
      <div className="bg-[#000000] md:flex hidden flex-col w-[240px] py-10 px-4 ">
        <img src={Logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
        <NavLink
          key="Login"
          to="/login"
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-white"
        >
          <IoMdLogIn className="w-6 h-6 mr-2" />
          Login
        </NavLink>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
          arrow
          className="bg-green-500"
        >
          <Button className="text-green-500 hover:text-green-500" size="large">
            UserName
          </Button>
        </Dropdown>
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
        <NavLink
          key="Login"
          to="/login"
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-white"
        >
          <IoMdLogIn className="w-6 h-6 mr-2" />
          Login
        </NavLink>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
          arrow
          className="bg-green-500"
        >
          <Button className="text-green-500 hover:text-green-500" size="large">
            UserName
          </Button>
        </Dropdown>
      </div>
    </>
  );
};

export default Sidebar;
