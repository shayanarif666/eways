import React from 'react';
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';

function Logo({
  className = "",
  ...props
}) {
  return (
    <Link to="/">
      <img
        src={logo}
        alt=""
        className={`${className}`}
        {...props}
        style={{ height: "100px", width: "100px", filter: "invert(99%) sepia(13%) saturate(0%) hue-rotate(66deg) brightness(113%) contrast(95%)" }}
      />
    </Link>
  )
}

export default Logo
