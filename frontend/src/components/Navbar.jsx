import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon">⚡</div>

        <div>
          <div className="logo-title">
            Inventory Pro
          </div>

          <div className="logo-subtitle">
            Smart Inventory Management
          </div>
        </div>
      </div>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/orders">Orders</Link>
      </div>

      <button
        className="theme-btn"
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode
          ? "☀ Light"
          : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;