// import logo from "../../../public/img/logo.png";
// import cartIcon from "../../../public/img/cartIcon.png";
//1
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="shrink-0">
          <img src="/img/logo.png" alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Center: Menu */}
        <ul className="hidden md:flex space-x-10 text-sm font-medium text-gray-700">
          <li className="cursor-pointer hover:text-black transition-colors">
            NEW IN
          </li>
          <li className="cursor-pointer hover:text-black transition-colors">
            APPAREL
          </li>
          <li className="cursor-pointer hover:text-black transition-colors">
            EXPLORE
          </li>
        </ul>

        {/* Right: Actions */}
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">
          <span className="cursor-pointer hover:text-black transition-colors">
            SEARCH
          </span>
          {/* <span className="cursor-pointer hover:text-black transition-colors">
            LOGIN
          </span> */}
          {/* 2 */}
          {/* Login redirect*/}
          <Link
            to="/login"
            className="cursor-pointer hover:text-black transition-colors"
          >
            LOGIN
          </Link>

          {/* Cart Icon */}
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={goToCart}
          >
            <img src="/img/cartIcon.png" alt="Cart" className="h-5 w-auto" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
