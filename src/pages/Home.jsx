import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { RiArrowRightSLine, RiLockLine, RiFunctionLine, RiKeyLine, RiCodeSSlashLine } from 'react-icons/ri';

export default function Home() {
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

    const handleTryItNow = () => {
        if (user) {
            // Nếu người dùng đã đăng nhập, chuyển tới trang mã hóa/giải mã
            navigate("/hillcipher");
        } else {
            // Nếu người dùng chưa đăng nhập, chuyển tới trang đăng nhập
            navigate("/login");
        }
    };

    return (
        <div className="pt-16">
           <Header />
           <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
              {/* Hero Section */}
              <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                      <h1 className="text-5xl font-bold text-slate-800 animate-fade-in">
                        Hill Cipher
                        <span className="block text-2xl text-slate-600 mt-2">
                          Advanced Matrix-Based Encryption
                        </span>
                      </h1>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        Discover the power of mathematical encryption using matrices. 
                        The Hill cipher transforms your messages into unbreakable code 
                        using linear algebra principles.
                      </p>
                      <div className="flex items-center gap-4 animate-slide-up">
                        <button 
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg 
                            flex items-center gap-2 hover:bg-indigo-700 transition-colors"
                            onClick={handleTryItNow} // Add onClick handler
                        >
                          Try it Now <RiArrowRightSLine size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 
                        to-purple-500/10 rounded-full filter blur-3xl"></div>
                      <div className="relative grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-xl transform hover:scale-105 
                          transition-transform">
                          <RiLockLine className="w-10 h-10 text-indigo-600 mb-4" />
                          <h3 className="font-semibold text-slate-800">Secure Encryption</h3>
                          <p className="text-slate-600 mt-2">Matrix-based encryption for enhanced security</p>
                        </div>
                        {/* <div className="bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 
                          transition-transform mt-8">
                          <RiFunctionLine className="w-10 h-10 text-purple-600 mb-4" />
                          <h3 className="font-semibold text-slate-800">Matrix Operations</h3>
                          <p className="text-slate-600 mt-2">Linear algebra meets cryptography</p>
                        </div> */}
                        <div className="">
                          <DotLottieReact
                            src="https://lottie.host/fbead96f-094e-4732-919e-387ebfda72fc/wlkcjZatwQ.lottie"
                            loop
                            autoplay
                            style={{ width: '300px', height: '200px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Explanation Section */}
              <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-center text-slate-800 mb-16">
                    How Hill Cipher Works
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-lg bg-gradient-to-br from-slate-50 to-white 
                      shadow-lg hover:shadow-xl transition-shadow">
                      <RiKeyLine className="w-12 h-12 text-indigo-600 mb-4" />
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Key Matrix</h3>
                      <p className="text-slate-600">
                        Create a square matrix as your encryption key. This matrix will be 
                        used to transform your message.
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-gradient-to-br from-slate-50 to-white 
                      shadow-lg hover:shadow-xl transition-shadow">
                      <RiCodeSSlashLine className="w-12 h-12 text-purple-600 mb-4" />
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Message Conversion</h3>
                      <p className="text-slate-600">
                        Convert your message into numerical values and arrange them in matrices 
                        of appropriate size.
                      </p>
                    </div>
                    <div className="p-6 rounded-lg bg-gradient-to-br from-slate-50 to-white 
                      shadow-lg hover:shadow-xl transition-shadow">
                      <RiFunctionLine className="w-12 h-12 text-indigo-600 mb-4" />
                      <h3 className="text-xl font-semibold text-slate-800 mb-3">Matrix Multiplication</h3>
                      <p className="text-slate-600">
                        Multiply your message matrix with the key matrix to produce the 
                        encrypted message.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Visual Demo Section */}
              <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="max-w-6xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-slate-800 mb-8">
                    See It in Action
                  </h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
                    Watch how the Hill cipher transforms plain text into encrypted messages 
                    using matrix operations and mathematical principles.
                  </p>
                  <div className="aspect-video bg-white rounded-xl shadow-2xl p-8">
                    {/* Placeholder for interactive demo or animation */}
                    <div className="h-full flex items-center justify-center">
                      <p className="text-slate-400">Interactive Demo Coming Soon</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <Footer />
        </div>
    );
}
