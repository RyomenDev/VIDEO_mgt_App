import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import logo from "../../assets/icon.png";

function Header() {
  const navigate = useNavigate();

  // Get authentication status from Redux store
  const authStatus = useSelector((state) => state.auth.status);

  // Navigation items definition
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Dashboard",
      slug: "/dashboard",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4 shadow-md bg-gray-800 text-white">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-2xl font-semibold">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <img src={logo} alt="V-mgt Logo" className="w-8 h-8" />
            <span className="text-2xl font-semibold">V-mgt</span>
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`lg:flex space-x-6 ${
            isMenuOpen
              ? "flex-col absolute top-20 left-0 w-full bg-gray-800 text-center py-4"
              : "hidden"
          }`}
        >
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-500 hover:text-white transition duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
