import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the user object from localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing JSON:", error);
                localStorage.removeItem("user"); // Remove invalid data
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove user from localStorage
        setUser(null);
        navigate("/");
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-200 text-black p-4 shadow-xl z-50 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold">
                HILL CIPHER
            </Link>

            {/* Navigation Menu */}
            <nav className="absolute left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-xl px-4 py-2 flex space-x-4">
                <Link to="/" className="text-black hover:underline">Home</Link>
                <Link to="/hillcipher" className="text-black hover:underline">Tools</Link>
                <Link to="/docs" className="text-black hover:underline">Docs</Link>
                <Link to="/about" className="text-black hover:underline">About</Link>
            </nav>

            {/* User Status Check */}
            <div className="flex items-center space-x-2 min-w-0">
                {user ? (
                    <>
                        <span className="text-black font-bold truncate">
                            <Link to="/profile" className="hover:underline">{user.email}</Link>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="bg-white text-blue-500 px-4 py-2 rounded-md mr-2 hover:bg-blue-500 hover:text-white">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-500">
                                Sign Up
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
