import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ placeholder, label, onChange, value, type = "text" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800 dark:text-dark-text-secondary">{label}</label>
      <div className="input-box flex items-center">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none dark:text-dark-text"
          value={value}
          onChange={onChange}
        />

        {type === "password" && (
          showPassword ? (
            <FaRegEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            /> 
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-slate-400 dark:text-dark-text-secondary curosr-pointer"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
  