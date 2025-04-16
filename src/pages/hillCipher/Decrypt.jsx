import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { decryptText } from "../../api/hillCipher";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

function parseKeyMatrix(keyMatrixArray) {
    const parsedMatrix = [];

    for (let i = 0; i < keyMatrixArray.length; i++) {
        const item = keyMatrixArray[i];
        const char = item.toString().toUpperCase();

        if (/^[A-Z]$/.test(char)) {
            parsedMatrix.push(char.charCodeAt(0) - 65);
        } else if (/^\d{1,2}$/.test(char)) {
            const number = parseInt(char, 10);
            if (number >= 0 && number <= 25) {
                parsedMatrix.push(number);
            } else {
                throw new Error(`Số phải trong khoảng từ 0 đến 25, nhưng nhận được: ${number}`);
            }
        } else {
            throw new Error(`Ký tự không hợp lệ trong ma trận khóa: ${item}`);
        }
    }

    return parsedMatrix;
}

const Decrypt = () => {
    const location = useLocation();
    // const navigate = useNavigate();
    const [plainText, setPlainText] = useState(""); 
    const [cipherText, setCipherText] = useState("");
    const [keyMatrix, setKeyMatrix] = useState([]);
    const [matrixSize, setMatrixSize] = useState(0);
    const [steps, setSteps] = useState([]);
    const [showMatrix, setShowMatrix] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const text = params.get("text");
        const len = params.get("len");
        const keyMatrixStr = params.get("keyMatrix"); // Lấy ma trận khóa từ URL
        if (text && len) {
            setPlainText(decodeURIComponent(text)); // Giải mã văn bản
    
            // Kiểm tra và xác định kích thước ma trận khóa
            const size = Math.ceil(Math.sqrt(parseInt(len, 10)));
            if (size >= 2) {
                setMatrixSize(size); // Lưu kích thước ma trận
    
                // Khởi tạo ma trận khóa trống với đúng kích thước
                const initialMatrix = Array(size * size).fill("");
                setKeyMatrix(initialMatrix); // Khởi tạo ma trận khóa
                setShowMatrix(true);
            }
        }
    
        if (keyMatrixStr) {
            try {
                // Giải mã và chuyển ma trận khóa từ chuỗi JSON trong URL
                const parsedKeyMatrix = JSON.parse(decodeURIComponent(keyMatrixStr));
                setKeyMatrix(parsedKeyMatrix); // Cập nhật ma trận khóa
            } catch (error) {
                console.error("Lỗi khi giải mã khóa:", error);
            }
        }
    }, [location]);
    

    const handleDecrypt = async () => {
        setErrorMessage("");
        setCipherText("");
        setSteps([]);
    
        if (!plainText.trim() || keyMatrix.some(val => val === "")) {
            alert("Vui lòng nhập đầy đủ dữ liệu!");
            return;
        }
    
        const originalLength = parseInt(new URLSearchParams(location.search).get("len"), 10);  // Lấy độ dài văn bản gốc từ URL
    
        try {
            const result = await decryptText(plainText.trim(), parseKeyMatrix(keyMatrix), originalLength);  // Thêm originalLength
    
            if (result && result.decryptedText && Array.isArray(result.steps)) {
                // Cắt văn bản giải mã theo độ dài văn bản gốc
                const decryptedText = result.decryptedText.substring(0, originalLength); // Cắt đi phần thừa
                setCipherText(decryptedText);
                setSteps(result.steps);
            } else {
                setErrorMessage("Dữ liệu trả về không hợp lệ!");
            }
    
        } catch (error) {
            console.error("Lỗi khi giải mã:", error);
            console.log("Full error object:", JSON.stringify(error, null, 2));
    
            const message = 
                error?.response?.data?.error || 
                error?.message || 
                "Đã xảy ra lỗi không xác định!"; 
            setErrorMessage(message); 
        }
    };

    const handleMatrixSizeChange = (e) => {
        const size = parseInt(e.target.value);
        setMatrixSize(size);
        setShowMatrix(false);
    };

    const handleOkClick = () => {
        if (matrixSize >= 2) {
            setKeyMatrix(Array(matrixSize * matrixSize).fill(""));
            setShowMatrix(true);
        } else {
            alert("Kích thước ma trận phải từ 2x2 trở lên!");
        }
    };

    const handleKeyMatrixChange = (index, value) => {
        const newKeyMatrix = [...keyMatrix];

        if (value === "") {
            newKeyMatrix[index] = "";
            setKeyMatrix(newKeyMatrix);
            return;
        }

        if (/^[A-Za-z]$/.test(value)) {
            newKeyMatrix[index] = value.toUpperCase();
        } else if (/^\d{1,2}$/.test(value)) {
            const number = parseInt(value, 10);
            if (number >= 0 && number <= 25) {
                newKeyMatrix[index] = number;
            } else {
                alert("Số phải trong khoảng từ 0 đến 25");
                return;
            }
        } else {
            alert("Vui lòng nhập chữ cái (A-Z) hoặc số trong khoảng từ 0 đến 25");
            return;
        }
        setKeyMatrix(newKeyMatrix);
    };

    return (
        <div>
            <Header />
            <div className="pt-16 bg-gray-300 pt-15 flex items-center justify-center min-h-screen">
                <div className="bg-white p-9 w-full">
                    <div className="text-center mb-6">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded">GIẢI MÃ HILL</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Bản mã</label>
                                <input
                                    type="text"
                                    placeholder="Nhập văn bản mã hóa"
                                    className="w-full p-2 border rounded"
                                    value={plainText}
                                    onChange={(e) => setPlainText(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 flex items-center space-x-4">
                                <div className="mb-2">
                                    <label className="block text-gray-700 mb-2">Kích thước ma trận khóa giải mã</label>
                                    <input
                                        type="number"
                                        placeholder="Nhập kích thước ma trận vuông (n ≥ 2)"
                                        className="w-full p-2 border rounded"
                                        value={matrixSize}
                                        onChange={handleMatrixSizeChange}
                                    />
                                </div>
                                <div className="mb-2 mt-8">
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        onClick={handleOkClick}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                            {showMatrix && matrixSize >= 2 && (
                                <div className="mt-4">
                                    <label className="block text-gray-700 mb-2">Nhập khóa của bạn</label>
                                    <div
                                        className="grid gap-2"
                                        style={{ gridTemplateColumns: `repeat(${matrixSize}, 1fr)` }}
                                    >
                                        {Array.from({ length: matrixSize * matrixSize }).map((_, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                className="p-2 border rounded w-full text-center"
                                                value={keyMatrix[index]}
                                                onChange={(e) => handleKeyMatrixChange(index, e.target.value)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mb-4 mt-4">
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                                    onClick={handleDecrypt}
                                >
                                    Giải mã
                                </button>
                                {errorMessage && (
                                    <div className="text-red-600 font-semibold bg-red-100 border border-red-400 px-4 py-2 rounded mt-2">
                                        ⚠️ {errorMessage}
                                    </div>
                                )}
                            </div>
                            <label className="block text-gray-700 mb-2">Văn bản giải mã</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    className="flex-1 p-2 border rounded"
                                    value={cipherText}
                                    readOnly
                                />
                                <Link to="/encrypt">
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded">
                                        Mã hóa
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Chi tiết bước giải mã</label>
                            {steps && steps.length > 0 ? (
                                <div className="mt-4 p-4 bg-gray-200 rounded">
                                    <h3 className="font-semibold">📌</h3>
                                    <ul className="list-disc list-inside text-sm space-y-2">
                                        {steps.map((step, index) => (
                                            <div
                                                key={index}
                                                className="opacity-0 animate-fadeInUp"
                                                style={{ animationDelay: `${index * 0.3}s` }}
                                            >
                                                <p dangerouslySetInnerHTML={{ __html: step.key }} />
                                                {step.details && step.details.map((detail, i) => (
                                                    <p 
                                                        key={i} 
                                                        className="ml-5 opacity-0 animate-fadeInUp"
                                                        style={{ animationDelay: `${(index + i + 1) * 0.3}s` }}
                                                        dangerouslySetInnerHTML={{ __html: detail }} 
                                                    />
                                                ))}
                                                <p>{step.step}</p>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div>
                                    <DotLottieReact
                                        src="https://lottie.host/9da4ea67-0a55-43c3-a8a7-fb9937295561/Nqck7ppLJQ.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Decrypt;
