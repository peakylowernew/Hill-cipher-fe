import { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const About = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="py-12 px-4 sm:px-6 lg:px-8 mt-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
               Hill Cipher
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Tìm hiểu về dự án và đội ngũ phát triển
            </p>
          </div>

          {/* Project Description */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dự án của chúng tôi</h2>
            <p className="text-gray-600 mb-4">
              Hill Cipher là một hệ mật thay thế đa bảng dựa trên đại số tuyến tính.
              Phiên bản của chúng tôi cung cấp cả khả năng mã hóa và giải mã.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tính năng</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Mã hóa an toàn sử dụng phép toán ma trận</li>
                  <li>Giao diện thân thiện với người dùng</li>
                  <li>Tài liệu hướng dẫn chi tiết</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Công nghệ</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Frontend React.js</li>
                  <li>Backend Node.js</li>
                  <li>JAMStack</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Đội ngũ phát triển</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Member 1 */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">PMT</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Phạm Minh Trung</h3>
                <p className="text-gray-600">Full Stack</p>
              </div>

              {/* Member 2 */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">HQV</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Huỳnh Quan Vinh</h3>
                <p className="text-gray-600">Trưởng dự án & Full Stack</p>
              </div>

              {/* Member 3 */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">NPC</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Nguyễn Phi Cường</h3>
                <p className="text-gray-600">Frontend</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
