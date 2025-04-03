import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const response = await login(email, password);
        console.log("Đăng nhập thành công:", response);

        // Lưu thông tin user vào localStorage
        localStorage.setItem("user", JSON.stringify({ email, token: response.token }));

        navigate("/profile"); // Chuyển hướng đến trang Profile
    } catch (err) {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="login-form bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-all hover:scale-105 group">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-2">Mật khẩu:</label>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Nhập mật khẩu"
              required
            />
             <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-pink-500" />
              <span className="text-gray-300">Remember me</span>
            </label>
            <a href="#" className="text-pink-400 hover:underline">Forgot Password?</a>
          </div>
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-100 p-2 rounded-lg mb-4">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>

          {/* Hiển thị thêm các nút với hiệu ứng mờ */}
          <div className="mt-4 text-center opacity-50 transition-opacity duration-300 space-y-2">
            <button className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition duration-300">
              Đăng nhập bằng Google
            </button>
            <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300">
              Đăng nhập bằng Facebook
            </button>
            <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300">
              Đăng nhập bằng GitHub
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
