import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra xem localStorage có dữ liệu không trước khi parse
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Lỗi parse JSON:", error);
                localStorage.removeItem("user"); // Xóa dữ liệu lỗi
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Xóa user khỏi localStorage
        setUser(null);
        navigate("/");
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-blue-500 text-white p-4 shadow-md z-50 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-lg font-bold hover:underline">
                Hill Cipher
            </Link>

            <div className="flex space-x-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/hillcipher" className="hover:underline">Tools</Link>
                <Link to="/about" className="hover:underline">About</Link>
            </div>

            {/* Kiểm tra trạng thái đăng nhập */}
            <div>
                {user ? (
                    <div className="flex items-center">
                        <span className="mr-4">{user.email}</span>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="bg-white text-blue-500 px-4 py-2 rounded-md mr-2 hover:bg-gray-200">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500">
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
