import React from 'react';
import { FiSearch } from "react-icons/fi";

function Input({
  className = "",
  label = "",
  type,
  placeholder = "",
  value,
  onChangeValue,
  style,
  ...props
}) {
  return (
    <>
      {type === "search" ? <></> : <label>{label}</label>}
      <div className={`input ${type = "search" ? "relative" : "static"}`}>
        <input
          type={type}
          className={`form-control w-100 ${className} focus:shadow-none`}
          value={value}
          onChange={onChangeValue}
          placeholder={placeholder}
          style={style}
          {...props}
        />
        <FiSearch
          className='absolute right-5 top-50 -translate-y-1/2 bg-red-700 text-4xl rounded-full p-1.5 text-white hover:bg-red-800 cursor-pointer'
        />

      </div>
    </>
  )
}

export default Input
