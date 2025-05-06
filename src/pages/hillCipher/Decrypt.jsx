import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { decryptText } from "../../api/hillCipher";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { getUid } from "../../utils/auth";
import AlertBox from "../../utils/AlertBox";
import { generateInvertibleMatrix } from "../../utils/matrixGenerator.js";

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
    const [originalText, setOriginalText ]=useState("");
    const [plainText, setPlainText] = useState(""); 
    const [cipherText, setCipherText] = useState("");
    const [keyMatrix, setKeyMatrix] = useState([]);
    const [inverseMatrix, setInverseMatrix] = useState([]);
    const [matrixSize, setMatrixSize] = useState(0);
    const [steps, setSteps] = useState([]);
    const [showMatrix, setShowMatrix] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const userId = getUid();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const text = params.get("text");// van ban da ma hoas
        const len = params.get("len"); 
        const keyMatrixStr = params.get("keyMatrix"); // Lấy ma trận khóa từ URL
        const originalText = params.get("originaltext");

        if (originalText) {
            setOriginalText(decodeURIComponent(originalText));  // Lưu giá trị originalText
        }

        if (text && len) {
            setPlainText(decodeURIComponent(text)); // Giải mã văn bản
    
            // Kiểm tra và xác định kích thước ma trận khóa
            const size = Math.ceil(Math.sqrt(parseInt(len, 10)));
            if (size >= 2) {
                setMatrixSize(size); // Lưu kích thước ma trận
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
    
        if (!plainText.trim() || keyMatrix.some(val => val === "" || !userId)) {
            alert("Vui lòng nhập đầy đủ dữ liệu!");
            return;
        }
    
        // const originalLength = parseInt(new URLSearchParams(location.search).get("plaintext") || "0", 10);
        const originalLength = plainText.trim().length;
        console.log("originalText:", originalText);
        
        try {
            const uid = getUid();

            const result = await decryptText(
                plainText.trim(),
                parseKeyMatrix(keyMatrix),
                uid,
                originalText
            );

            if (result && typeof result.decryptedText === 'string' && result.decryptedText !== "" && Array.isArray(result.steps)) {
                const decryptedText = result.decryptedText.substring(0, originalLength);
                setCipherText(decryptedText);
                setSteps(result.steps);
                 // Kiểm tra trước khi cập nhật inverseMatrix
            if (Array.isArray(result.inverseMatrix) && result.inverseMatrix.length > 0) {
                setInverseMatrix(result.inverseMatrix);
                console.log("Khóa nghịch đảo:", result.inverseMatrix);
            } else {
                console.error("Khóa nghịch đảo không hợp lệ:", result.inverseMatrix);
            }
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
                                <div className="mb-2 mt-8 flex gap-2">
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        onClick={handleOkClick}
                                    >
                                        OK
                                    </button>
                                    <button
                                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                        onClick={() => {
                                            if (matrixSize >= 2) {
                                                const randomMatrix = generateInvertibleMatrix(matrixSize);
                                                setKeyMatrix(randomMatrix.map(v => v));
                                                setShowMatrix(true);
                                            } else {
                                                alert("Kích thước ma trận phải từ 2x2 trở lên!");
                                            }
                                        }}
                                    >
                                        Tạo ngẫu nhiên
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
                                                type="text"yy
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
                                {errorMessage && <AlertBox message={errorMessage} type="error" />}
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
                                    <div className="mb-4">
                                    {Array.isArray(inverseMatrix) && inverseMatrix.length > 0 && (
                                        <>
                                            <p className="font-semibold mb-2">🔐 KHÓA NGHỊCH ĐẢO:</p>
                                            <div className="inline-block">
                                                {Array.from({ length: matrixSize }).map((_, rowIndex) => (
                                                    <div key={rowIndex} className="flex justify-center space-x-2 mb-2">
                                                        {Array.from({ length: matrixSize }).map((_, colIndex) => {
                                                            const value = inverseMatrix[rowIndex]?.[colIndex];

                                                            return (
                                                                <div
                                                                    key={colIndex}
                                                                    className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg shadow-sm text-lg font-medium bg-white"
                                                                >
                                                                    {value}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    </div>
                                    <ul className="list-disc list-inside text-sm space-y-2">
                                        {steps.map((step, index) => (
                                            <div
                                                key={index}
                                                className="opacity-0 animate-fadeInUp"
                                                style={{ animationDelay: `${index * 0.3}s` }}
                                            >
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
