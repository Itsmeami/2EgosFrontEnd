import logo from "../../../public/img/logo.png";
import cartIcon from "../../../public/img/cartIcon.png";

function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
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
          <span className="cursor-pointer hover:text-black transition-colors">
            LOGIN
          </span>

          {/* Cart Icon */}
          <div className="flex items-center justify-center">
            <img src={cartIcon} alt="Cart" className="h-5 w-auto" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
