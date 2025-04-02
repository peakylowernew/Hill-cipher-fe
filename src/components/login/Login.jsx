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
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default Login;
