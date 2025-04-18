import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const timeoutRef = useRef(null);

    const handleLogin = () => navigate("/login");
    const handleSignUp = () => navigate("/signup");

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsMenuOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsMenuOpen(false);
        }, 200); // Delay 200ms để user kịp click
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-200 text-black p-4 shadow-xl z-50 flex justify-between items-center">
            
            {/* Hover menu trigger + menu wrapper */}
            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button className="text-black focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Menu dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-10 left-0 bg-gray-300 rounded-xl p-4 flex flex-col space-y-2 z-50 shadow-md min-w-[120px]">
                        <Link to="/" className="text-black hover:underline">Home</Link>
                        <Link to="/hillcipher" className="text-black hover:underline">Tools</Link>
                        <Link to="/docs" className="text-black hover:underline">Docs</Link>
                        <Link to="/about" className="text-black hover:underline">About</Link>
                    </div>
                )}
            </div>

            {/* Title */}
            <div className="flex-1 text-center px-4">
                <Link to="/" className="text-xl font-bold">
                    Tìm hiểu công nghệ Jamstack và xây dựng ứng dụng Web minh họa thuật toán mã hóa và giải mã Hill
                </Link>
            </div>

            {/* Login/Signup */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={handleLogin}
                    className="bg-white text-blue-500 px-4 py-2 rounded-md mr-2 hover:bg-blue-500 hover:text-white"
                >
                    login
                </button>
                <button
                    onClick={handleSignUp}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-500"
                >
                    sign up
                </button>
            </div>
        </header>
    );
};

export default Header;
