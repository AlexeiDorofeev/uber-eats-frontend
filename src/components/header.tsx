import React from "react";
import logo from "../images/1.svg";

interface IHeaderProps {
  email: string;
}

export const Header: React.FC<IHeaderProps> = ({ email }) => (
  <header className="py-4">
    <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
      <img src={logo} className="w-24" alt="Uber Eats Logo" />I am the header
      <span className="text-xs">{email}</span>
    </div>
  </header>
);
