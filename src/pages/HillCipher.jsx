import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const HillCipher = () => {
    return (
        <div>
             <Header />
        <div className="bg-gray-300 flex flex-col items-center justify-center min-h-screen">
           
            <div className="text-center px-4">
                <p className="text-lg font-bold">Hill cipher</p>
                <p className="text-base">Là một loại mật mã thay thế đa ký tự sử dụng đại số tuyến tính, cụ thể là ma trận, để mã hóa và giải mã tin nhắn.</p>
                <p className="text-base mt-2">Được phát minh bởi <span className="font-bold">Lester S. Hill</span> vào năm 1929, nó chuyển đổi các khối văn bản thuần túy thành văn bản mã hóa thông qua phép nhân ma trận và số học mô-đun.</p>
            </div>
            <div className="mt-8">
                <i className="fas fa-chevron-down text-2xl"></i>
            </div>
            <div className="mt-4 flex flex-col items-center space-y-2">
                <Link to='/encrypt'>
                    <button className="bg-gray-500 text-white py-2 px-16 rounded transition duration-300 hover:bg-gray-700">
                        Mã hóa
                    </button>
                </Link>
                <Link to='/decrypt'>
                    <button className="bg-white text-black py-2 px-4 rounded ">
                        Giải mã
                    </button>
                </Link>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default HillCipher;