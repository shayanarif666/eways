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
        style={{ height: "120px", width: "120px", filter: "invert(96%) sepia(9%) saturate(3%) hue-rotate(350deg) brightness(120%) contrast(100%)" }}
      />
    </Link>
  )
}

export default Logo
