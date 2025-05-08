import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const HillCipher = () => {
  return (
    <div className="bg-gradient-to-tr from-purple-100 via-white to-blue-100 min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-purple-700 mb-4 animate-slide-down">
            🔐 Hill Cipher
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed animate-fade-in delay-100">
            Hill Cipher là phương pháp mã hóa sử dụng <strong>ma trận và số học modulo</strong> để biến đổi văn bản thuần túy thành mã hóa.
          </p>
          <p className="mt-2 text-gray-600 animate-fade-in delay-200">
            Phát minh bởi <span className="font-semibold text-purple-600">Lester S. Hill</span> năm 1929, kỹ thuật này là nền tảng trong mật mã học hiện đại.
          </p>

          <div className="mt-8 flex justify-center gap-6 animate-fade-in delay-300">
            <Link to="/encrypt">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transform hover:scale-105 transition duration-300">
                🔒 Mã hóa
              </button>
            </Link>
            <Link to="/decrypt">
              <button className="bg-white border-2 border-purple-500 text-purple-700 px-6 py-3 rounded-full shadow hover:bg-purple-50 transform hover:scale-105 transition duration-300">
                🔓 Giải mã
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HillCipher;
