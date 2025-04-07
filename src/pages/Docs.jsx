import { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Docs = () => {
  const [isExpanded, setIsExpanded] = useState(false); 
  const [currentSection, setCurrentSection] = useState(0); // Để theo dõi mục hiện tại

  const sections = [
    {
      title: "1. Giới Thiệu Hill Cipher",
      content: (
        <p className="text-gray-600 leading-relaxed mb-4">
          Thuật toán Hill Cipher là một phương pháp mã hóa đối xứng dựa trên đại số tuyến tính, được phát minh bởi Lester S. Hill vào năm 1929. Nó sử dụng ma trận để mã hóa và giải mã thông điệp, thay vì chỉ thay thế ký tự như các thuật toán mã hóa cổ điển (ví dụ: Caesar Cipher).
        </p>
      ),
    },
    {
      title: "2. Nguyên lý hoạt động",
      content: (
        <div>
          <ul className="list-disc list-inside text-gray-600 space-y-2"> 
            <li><strong>Thông điệp:</strong> Văn bản cần mã hóa được chia thành các khối có độ dài cố định (thường là n ký tự, với n là kích thước ma trận khóa).</li>
          </ul>
          {isExpanded && (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Nguyên lý hoạt động</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
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
        </div>
      ),
    },
    {
      title: "3. FAQ",
      content: (
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
      ),
    },
  ];

  const nextSection = () => {
    // Nếu đang ở mục cuối cùng thì quay lại mục đầu tiên
    setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
  };

  const prevSection = () => {
    // Nếu đang ở mục đầu tiên thì quay lại mục cuối cùng
    setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="pt-20 max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10 tracking-tight">
            Tài Liệu
          </h1>

          <div className="flex flex-row space-x-6 overflow-x-auto">
            <div className="flex flex-col w-full">
              <section className="bg-white shadow-lg rounded-xl p-8 mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{sections[currentSection].title}</h2>
                {sections[currentSection].content}
              </section>
              <div className="flex justify-between">
                <button
                  onClick={prevSection}
                  className="px-6 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 transition duration-300 group relative"
                >
                  ← 
                </button>
                <button
                  onClick={nextSection}
                  className="px-6 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 transition duration-300 group relative"
                >
                  →
                </button>
              </div>

              {/* Dấu chấm tròn chỉ mục hiện tại */}
              <div className="flex justify-center space-x-2 mt-4">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${currentSection === index ? "bg-gray-800" : "bg-gray-300"}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
{/* 
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 transition duration-300">
              Quay lại trang chủ
            </button>
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Docs;
