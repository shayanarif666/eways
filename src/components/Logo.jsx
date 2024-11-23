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
        style={{ height: "150px", width: "150px", filter: "brightness(0) invert(1)" }}
      />
    </Link>
  )
}

export default Logo
