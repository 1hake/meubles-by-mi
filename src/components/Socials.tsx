// component displayed in the footer of the page to show social media links and icons using tailwindcss

import React from "react";

export const Socials = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <a
        href="
                https://www.facebook.com/arfan.ahmed.581
                "
        target="_blank"
        rel="noreferrer"
        className="text-2xl text-gray-400 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-500 mx-2"
      >
        <i className="fab fa-facebook-f"></i>
      </a>
      <a
        href="
                https://www.instagram.com/arfan_ahmed_581/
                "
        target="_blank"
        rel="noreferrer"
        className="text-2xl text-gray-400 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-500 mx-2"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href="
                https://www.linkedin.com/in/arfan-ahmed-581/
                "
        target="_blank"
        rel="noreferrer"
        className="text-2xl text-gray-400 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-500 mx-2"
      >
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  );
};
