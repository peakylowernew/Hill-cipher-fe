import { useState } from "react";
import { Link } from "react-router-dom";
import { decryptText } from "../../api/hillCipher";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
function parseKeyMatrix(keyMatrixArray) {
    const parsedMatrix = [];

    for (let i = 0; i < keyMatrixArray.length; i++) {
        const item = keyMatrixArray[i];
        const char = item.toString().toUpperCase();

        // Nếu là chữ cái A-Z
        if (/^[A-Z]$/.test(char)) {
            parsedMatrix.push(char.charCodeAt(0) - 65);
        }
        // Nếu là số trong khoảng từ 0 đến 25
        else if (/^\d{1,2}$/.test(char)) {
            const number = parseInt(char, 10);
            if (number >= 0 && number <= 25) {
                parsedMatrix.push(number);
            } else {
                throw new Error(`Số phải trong khoảng từ 0 đến 25, nhưng nhận được: ${number}`);
            }
        }
        // Nếu không hợp lệ
        else {
            throw new Error(`Ký tự không hợp lệ trong ma trận khóa: ${item}`);
        }
    }

    return parsedMatrix;
}

const Decrypt = () => {
    const [plainText, setPlainText] = useState(""); 
    const [cipherText, setCipherText] = useState("");
    const [keyMatrix, setKeyMatrix] = useState([]);
    const [matrixSize, setMatrixSize] = useState(0);
    const [steps, setSteps] = useState([]);
    const [showMatrix, setShowMatrix] = useState(false);

    const handleDecrypt = async () => {
        if (!plainText.trim() || keyMatrix.some(val => val === "")) {
            alert("Vui lòng nhập đầy đủ dữ liệu!");
            return;
        }
    
        try {
            // Gọi hàm giải mã từ API
            const response = await decryptText(plainText.trim(),parseKeyMatrix(keyMatrix));
            if (response && response.decryptedText && Array.isArray(response.steps)) {
                setCipherText(response.decryptedText);
                setSteps(response.steps);
            } else {
                throw new Error("Dữ liệu trả về không hợp lệ!");
            }
        } catch (error) {
            console.error("Lỗi khi giải mã:", error);
            setCipherText("");
            setSteps([]);
            alert("Có lỗi trong quá trình giải mã!");
        }
    };

    const handleMatrixSizeChange = (e) => {
        const size = parseInt(e.target.value);
        setMatrixSize(size);
        setShowMatrix(false);
    };

    const handleOkClick = () => {
        if (matrixSize >= 2) {
            setKeyMatrix(Array(matrixSize * matrixSize).fill(""));  // Khởi tạo ma trận khóa
            setShowMatrix(true);  // Hiển thị ma trận
        } else {
            alert("Kích thước ma trận phải từ 2x2 trở lên!");
        }
    };
    const handleKeyMatrixChange = (index, value) => {
        const newKeyMatrix = [...keyMatrix];
    
        // Nếu người dùng xóa giá trị (value là chuỗi rỗng), không làm gì cả
        if (value === "") {
            newKeyMatrix[index] = "";
            setKeyMatrix(newKeyMatrix);
            return;
        }
    
        // Nếu là chữ cái (A-Z)
        if (/^[A-Za-z]$/.test(value)) {
            newKeyMatrix[index] = value.toUpperCase(); // Chuyển chữ cái thành chữ hoa
        }
        // Nếu là số trong khoảng 0-25
        else if (/^\d{1,2}$/.test(value)) {
            const number = parseInt(value, 10);
            if (number >= 0 && number <= 25) {
                newKeyMatrix[index] = number;
            } else {
                alert("Số phải trong khoảng từ 0 đến 25");
                return; // Nếu số ngoài phạm vi, không cập nhật giá trị
            }
        } else {
            alert("Vui lòng nhập chữ cái (A-Z) hoặc số trong khoảng từ 0 đến 25");
            return; // Nếu giá trị không hợp lệ, không cập nhật
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
                                                // maxLength={1}
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
                            <div className="bg-gray-100 p-4 rounded h-full">
                                {steps && steps.length > 0 ? (
                                    <div className="mt-4 p-4 bg-gray-200 rounded">
                                        <h3 className="font-semibold">📌</h3>
                                        <ul className="list-disc list-inside text-sm space-y-2">
                                            {steps.map((step, index) => (
                                                <div key={index}>
                                                    <p dangerouslySetInnerHTML={{ __html: step.key }} />
                                                    {step.details && step.details.map((detail, i) => (
                                                        <p 
                                                            key={i} 
                                                            style={{ marginLeft: "20px" }} 
                                                            dangerouslySetInnerHTML={{ __html: detail }} 
                                                        />
                                                    ))}
                                                    <p>{step.step}</p>
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p>🚀 Đang xử lý hoặc chưa có dữ liệu...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Decrypt;
