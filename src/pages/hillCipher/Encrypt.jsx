import { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from "react-router-dom"; // Hook cho React Router v6+
import { encryptText } from "../../api/hillCipher";
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

const Encrypt = () => {
    const [plainText, setPlainText] = useState("");
    const [cipherText, setCipherText] = useState("");
    const [keyMatrix, setKeyMatrix] = useState([]);
    const [matrixSize, setMatrixSize] = useState(0);
    const [steps, setSteps] = useState([]);
    const [showMatrix, setShowMatrix] = useState(false);

    const navigate = useNavigate(); // Hook cho điều hướng

    // Hàm mã hóa
    const handleEncrypt = async (e) => {
        e.preventDefault();  // Ngừng hành vi gửi form mặc định

        if (!plainText.trim() || keyMatrix.some(val => val === "")) {
            alert("Vui lòng nhập đầy đủ dữ liệu!");
            return;
        }

        try {
            const response = await encryptText(plainText.trim(), parseKeyMatrix(keyMatrix));
            console.log("Dữ liệu trả về từ encryptText:", response);

            if (response && response.encryptedText && Array.isArray(response.processSteps)) {
                setCipherText(response.encryptedText);
                setSteps(response.processSteps);
            } else {
                throw new Error("Dữ liệu trả về không hợp lệ!");
            }
        } catch (error) {
            console.error("Lỗi khi mã hóa:", error);
            setCipherText("");
            setSteps([]);
            alert("Có lỗi trong quá trình mã hóa!");
        }
    };

    const handleMatrixSizeChange = (e) => {
        const size = parseInt(e.target.value);
        setMatrixSize(size);
        setShowMatrix(false);
    };

    const handleOkClick = () => {
        if (matrixSize >= 2) {
            setKeyMatrix(Array(matrixSize * matrixSize).fill("")); // Khởi tạo ma trận rỗng
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

    const handleDecryptionRedirect = (e) => {
        e.preventDefault();
        navigate(`/decrypt?text=${encodeURIComponent(cipherText)}&len=${keyMatrix.length}&keyMatrix=${encodeURIComponent(JSON.stringify(keyMatrix))}`);
    };

    return (
        <div>
            <Header />
            <div className="bg-gray-300 pt-15 flex items-center justify-center min-h-screen">
                <div className="bg-white p-9 w-full">
                    <div className="text-center mb-6">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded">MÃ HÓA HILL</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Bản rõ</label>
                                <input
                                    type="text"
                                    placeholder="Nhập văn bản"
                                    className="w-full p-2 border rounded"
                                    value={plainText}
                                    onChange={(e) => setPlainText(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 flex items-center space-x-4">
                                <div className="mb-2">
                                    <label className="block text-gray-700 mb-2">Kích thướt ma trận khóa mã hóa</label>
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
                                    onClick={handleEncrypt}  // Gọi hàm mã hóa
                                >
                                    Mã hóa
                                </button>
                            </div>
                            <label className="block text-gray-700 mb-2">Văn bản mã hóa</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="text"
                                    className="flex-1 p-2 border rounded"
                                    value={cipherText}
                                    readOnly
                                />
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                    onClick={handleDecryptionRedirect} // Dùng hàm điều hướng
                                >
                                    Giải mã
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Chi tiết bước mã hóa</label>
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
                                            {step.details?.map((detail, i) => (
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

export default Encrypt;
