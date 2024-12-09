import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <header
      className="header"
      style={{
        transition: "1s ease-in-out",
      }}
    >
      <NavLink to="/">
        <img src={logo} alt="logo" className="w-18 h-18 object-contain" />
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "hoverNavLink text-blue-600"
              : "hoverNavLink text-sky-300"
          }
          style={{ letterSpacing: ".35rem" }}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? "hoverNavLink text-blue-600"
              : "hoverNavLink text-sky-300"
          }
          style={{ letterSpacing: ".35rem" }}
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
