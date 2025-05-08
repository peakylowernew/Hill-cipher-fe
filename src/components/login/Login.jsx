import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // dùng để giải mã token để lấy UIDUID
import { GoogleLogin } from '@react-oauth/google';// login bằng google

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(email, password);
      console.log("Đăng nhập thành công:", response);
  
      if (response && response.token) {
        const token = response.token;
        const decoded = jwtDecode(token);
        const uid = decoded.uid;
  
        if (!uid) throw new Error("Không tìm thấy uid trong token");
        
        localStorage.setItem("token", token);
        localStorage.setItem("uid", uid);
        navigate("/profile");
      } else {
        throw new Error("Không có dữ liệu từ server");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      if (!credential) throw new Error("Không nhận được credential từ Google");

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: credential }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); // token backend trả về
        localStorage.setItem('uid', data.uid); // nếu backend có trả uid
        navigate("/profile");
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error("Lỗi đăng nhập Google:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-700">
      <div className="login-form bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition-all hover:scale-105 group">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-2">Mật khẩu:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Thay đổi type dựa trên trạng thái
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200"
                placeholder="Nhập mật khẩu"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Đổi trạng thái khi nhấn
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-gray-500" />
                <span className="text-gray-300">Remember me</span>
              </label>
              {/* <Link to="/" className="text-gray-500 hover:text-gray-800"></Link> */}
            </div>
          </div>
          {error && (
            <div className="text-gray-600 text-sm text-center bg-gray-100 p-2 rounded-lg mb-4">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>

          <div className="mt-4 text-center opacity-50 transition-opacity duration-300 space-y-2">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => console.error("Đăng nhập Google thất bại")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
