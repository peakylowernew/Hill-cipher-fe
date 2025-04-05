import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const HillCipher = () => {
    return (
        <div>
            <Header />
            <div className="bg-blackgray text-white flex flex-col items-center justify-center min-h-screen">
                <div className="text-center px-4">
                    <p className="text-lg font-bold">Hill cipher</p>
                    <p className="text-base">
                        Is a polygraphic substitution cipher that uses linear algebra, specifically matrices, to encrypt and decrypt messages.
                    </p>
                    <p className="text-base mt-2">
                        Invented by <span className="font-bold">Lester S. Hill</span> in 1929, it transforms blocks of plaintext into ciphertext through matrix multiplication and modular arithmetic.
                    </p>
                </div>

                <div className="mt-8">
                    <i className="fas fa-chevron-down text-2xl"></i>
                </div>

                <div className="mt-4 flex flex-col items-center space-y-2">
                    <Link
                        to='/encrypt'
                        className="bg-gray-500 text-white py-2 px-16 rounded transition duration-300 hover:bg-gray-700 text-center"
                    >
                        Mã hóa
                    </Link>
                    <Link
                        to='/decrypt'
                        className="bg-white text-black py-2 px-4 rounded text-center"
                    >
                        Giải mã
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HillCipher;
