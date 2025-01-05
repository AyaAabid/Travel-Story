import React from "react";

import Logo from "../../assets/images/blank.jpg";
import { ProfileInfo } from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";

export const NavBar = ({ userInfo }) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src={Logo} alt="travel logo" className="h-9" />

      {isToken && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
  );
};
