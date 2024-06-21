import React from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const ThemeToggle = ({ darkActive, setDarkActive }) => {
    return (
        <button
            onClick={() => { setDarkActive(!darkActive); localStorage.setItem("theme", !darkActive) }}
            className='text-yellow-200 px-2 text-xl aspect-square 
            flex items-center justify-center border-2 border-yellow-200 rounded-full bg-black'
        >
            {
                !darkActive
                    ? <MdDarkMode />
                    : <MdLightMode />
            }
        </button>
    )
}

export default ThemeToggle