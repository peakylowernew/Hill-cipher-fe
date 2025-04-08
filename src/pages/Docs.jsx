import { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Docs = () => {
  const [isExpanded, setIsExpanded] = useState(false); 

  return (
    <div>
    <Header/>
    <Header/>
      <div className="pt-16 max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10 tracking-tight">
          Tài Liệu
        </h1>
        <div className="flex flex-row space-x-6 overflow-x-auto">
          <section className="bg-white shadow-lg rounded-xl p-8 flex-shrink-0 w-96 transition-all hover:shadow-xl hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Thuật toán Hill Cipher</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Thuật toán Hill Cipher là một phương pháp mã hóa đối xứng dựa trên đại số tuyến tính, được phát minh bởi Lester S. Hill vào năm 1929. Nó sử dụng ma trận để mã hóa và giải mã thông điệp, thay vì chỉ thay thế ký tự như các thuật toán mã hóa cổ điển (ví dụ: Caesar Cipher).
            </p>
            {isExpanded && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Nguyên lý hoạt động</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>Thông điệp:</strong> Văn bản cần mã hóa được chia thành các khối có độ dài cố định (thường là n ký tự, với n là kích thước ma trận khóa).</li>
                  <li><strong>Ma trận khóa:</strong> Một ma trận vuông n*n (thường là 2*2 hoặc 3*3) được chọn làm khóa. Ma trận này phải khả nghịch (có định thức khác 0 và khả nghịch trong modulo 26 nếu dùng bảng chữ cái 26 ký tự).</li>
                  <li><strong>Mã hóa:</strong> Mỗi khối văn bản được biểu diễn dưới dạng vector số, sau đó nhân với ma trận khóa (modulo 26) để tạo ra văn bản mã hóa.</li>
                  <li><strong>Giải mã:</strong> Nhân vector mã hóa với ma trận nghịch đảo của ma trận khóa (modulo 26) để lấy lại văn bản gốc.</li>
                </ul>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Các bước thực hiện</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-medium text-gray-700">1. Chuẩn bị</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Chuyển văn bản thành số: Dùng bảng chữ cái tiếng Anh (A=0, B=1, ..., Z=25).</li>
                      <li>Chia văn bản thành các khối có độ dài n (nếu thiếu, thêm ký tự đệm, ví dụ "X").</li>
                      <li>Chọn ma trận khóa K kích thước n*n.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-700">2. Mã hóa</h4>
                    <p className="text-gray-600">Công thức: C = (K. P) mod 26</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>C: Vector văn bản mã hóa.</li>
                      <li>K: Ma trận khóa.</li>
                      <li>P: Vector văn bản gốc.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-700">3. Giải mã</h4>
                    <p className="text-gray-600">Công thức: P = (K^{-1} . C) mod 26</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>K^{-1}: Ma trận nghịch đảo của K.</li>
                      <li>Để tính K^{-1}, cần định thức của K và nhân nghịch đảo modulo 26.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-gray-700 hover:text-gray-900 font-medium underline focus:outline-none"
            >
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </button>
          </section>

          <section className="bg-white shadow-lg rounded-xl p-8 flex-shrink-0 w-96 transition-all hover:shadow-xl hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Cách bắt đầu</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Đăng ký tài khoản tại trang chủ.</li>
              <li>Đăng nhập bằng email và mật khẩu của bạn.</li>
              <li>Cập nhật hồ sơ cá nhân trong phần "Profile".</li>
            </ul>
          </section>

          <section className="bg-white shadow-lg rounded-xl p-8 flex-shrink-0 w-96 transition-all hover:shadow-xl hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Làm sao để đổi mật khẩu?</h3>
                <p className="text-gray-600">Vào phần "Profile", chọn "Chỉnh sửa hồ sơ" và cập nhật mật khẩu mới.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Hỗ trợ kỹ thuật ở đâu?</h3>
                <p className="text-gray-600">Liên hệ qua email: support@example.com.</p>
              </div>
            </div>
          </section>
        </div>

            </div>
    <Footer/>
    </div>
  );
};

export default Docs;
