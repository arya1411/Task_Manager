import React from 'react'
import UI_IMG from "../../assets/second_image.png"
import BG_IMG from "../../assets/bg-img.png"
const AuthLayout = ({children}) => {
  return (
    <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-white dark:bg-dark-bg transition-colors duration-300">
            <h2 className="text-lg font-medium text-black dark:text-dark-text">Task Manager</h2>
            <div className="mt-[35vh]">
              {children}
            </div>
        </div>

        <div
          className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 dark:bg-dark-surface bg-cover bg-no-repeat bg-center overflow-hidden p-8"
          style={{ backgroundImage: `url(${BG_IMG})` }}
        >
          <img
            src={UI_IMG}
            alt="Task Manager"
            className="w-full max-w-md object-contain"
          />
        </div>
    </div>
  )
}

export default AuthLayout