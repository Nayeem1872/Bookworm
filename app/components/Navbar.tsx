import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="Bookworm Logo" className="h-8" />
        </div>

        {/* Center Section: Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              Contact
            </a>
          </li>
          <li className="relative group">
            <button className="text-gray-800 hover:text-gray-600">Pages</button>
            {/* Dropdown Menu */}
            <ul className="absolute hidden group-hover:block bg-white shadow-md p-2 rounded">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Page 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Page 2
                </a>
              </li>
            </ul>
          </li>
        </ul>

        {/* Right Section: Sign Up and Login */}
        <div className="flex items-center space-x-4">
          <LoginDialog />
          <SignUpDialog />
        </div>
      </div>
    </nav>
  );
}
