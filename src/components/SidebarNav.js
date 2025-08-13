import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineCamera,
  AiOutlineFormatPainter,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { FaSpotify } from "react-icons/fa";

function SidebarNav() {
  return (
    <div className="sidebar-nav">
      <nav aria-label="Sidebar navigation">
        <ul>
          <li>
            <Link to="/" className="home-link">
              <AiOutlineHome />
            </Link>
          </li>
          <li>
            <Link to="/about" className="home-link">
              <AiOutlineUser />
            </Link>
          </li>
          <li>
            <Link to="/photography" className="home-link">
              <AiOutlineCamera />
            </Link>
          </li>
          <li>
            <Link to="/digitalartgallery" className="home-link">
              <AiOutlineFormatPainter />
            </Link>
          </li>
          <li>
            <Link to="/bookshelf" className="home-link">
              <AiOutlineBook />
            </Link>
          </li>
          <li>
            <Link to="/projects" className="home-link">
              <AiOutlineFundProjectionScreen />
            </Link>
          </li>
          <li>
            <Link to="/resume" className="home-link">
              <CgFileDocument />
            </Link>
          </li>
          <li>
            <Link to="/spotify" className="home-link">
              <FaSpotify />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SidebarNav;