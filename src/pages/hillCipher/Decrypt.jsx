import { useState } from "react";
import { Link } from "react-router-dom";
import { decryptText } from "../../api/hillCipher";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const Decrypt = () => {
    const [plainText, setPlainText] = useState("");
    const [cipherText, setCipherText] = useState("");
    const [keyMatrix, setKeyMatrix] = useState([]);
    const [matrixSize, setMatrixSize] = useState(0);
    const [result] = useState("");
    const [steps, setSteps] = useState([]);
    const [decryptedText] = useState("");
    const [showMatrix, setShowMatrix] = useState(false);
    
    const handleDecrypt = async () => {
        if (!plainText.trim() || keyMatrix.some(val => val === "")) {
            alert("Vui lòng nhập đầy đủ dữ liệu!");
            return;
        }
    
        // Chờ kết quả từ API DecryptText
        const { decryptedText, processSteps } = await decryptText(plainText.trim(), keyMatrix.map(Number));
    
        // Log để kiểm tra giá trị trả về từ API
        console.log("DecrytedText: ", decryptedText);
    
        if (decryptedText) {
            setCipherText(decryptedText);  // Cập nhật cipherText
            setSteps(processSteps);
        } else {
            setCipherText("");  // Nếu không có kết quả giải mã, đặt cipherText rỗng
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
            setKeyMatrix(Array(matrixSize * matrixSize).fill(""));
            setShowMatrix(true);
        } else {
            alert("Kích thước ma trận phải từ 2x2 trở lên!");
        }
    };

    const handleKeyMatrixChange = (index, value) => {
        const newKeyMatrix = [...keyMatrix];
        newKeyMatrix[index] = value.replace(/\D/g, "");
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
                                    <label className="block text-gray-700 mb-2">Kích thướt ma trận khóa giải mã</label>
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
                                        style={{ gridTemplateColumns: `repeat(${matrixSize}, 1fr)` }} // Tạo số cột động
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
                            <div className="bg-gray-100 p-4 rounded h-full flex items-center justify-center">
                                <span>...</span>
                            </div>
                        </div>
                    </div>
                    {decryptedText && (
                        <div className="mt-4 p-2 bg-blue-100 rounded font-semibold">
                            <p>Bản mã đã giải mã: {decryptedText}</p>
                        </div>
                    )}
                    {result && <p className="mt-4 p-2 bg-gray-200 rounded font-semibold">{result}</p>}
                    {steps && steps.length > 0 && (
                        <div className="mt-4 p-4 bg-gray-100 rounded">
                            <h3 className="font-semibold">Chi tiết các bước:</h3>
                            <ul className="list-disc list-inside text-sm">
                                {steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Decrypt;
