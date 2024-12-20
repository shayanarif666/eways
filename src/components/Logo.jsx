import React from 'react';
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';

function Logo({
  className = "",
  filter = "",
  width = "",
  height = "",
  ...props
}) {
  return (
    <Link to="/">
      <img
        src={logo}
        alt=""
        className={`${className}`}
        {...props}
        style={{ height: `${height ? height : "150px"}`, width: `${width ? width : "150px"}`, filter: filter }}
      />
    </Link>
  )
}

export default Logo
