import React from "react";

function Footer() {
  const date = new Date();
  const curr_year = date.getFullYear();

  return (
    <footer className="text-center lg:text-left bg-[#000000] text-white">
      <div className="text-center p-3 bg-[#000000]">
        <span> Copyright © {curr_year}, </span>
        <a
          href="https://www.iitrpr.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IIT Ropar
        </a>
      </div>
    </footer>
  );
}

export default Footer;
