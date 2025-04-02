import { useState } from "react";
import { encryptText, decryptText } from "../api/hillCipher";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const HillCipher = () => {
    const [plainText, setPlainText] = useState("");
    const [cipherText, setCipherText] = useState("");
    const [keyMatrix, setKeyMatrix] = useState("");
    const [result, setResult] = useState("");

    const handleEncrypt = () => {
        const encrypted = encryptText(plainText, keyMatrix);
        if (encrypted) setResult(`Bản mã: ${encrypted}`);
    };

    const handleDecrypt = () => {
        const decrypted = decryptText(cipherText, keyMatrix);
        if (decrypted) setResult(`Bản gốc: ${decrypted}`);
    };

    return (
        <div className="pt-16">
            <Header />
            <h2 className="text-xl font-bold text-center mb-4">Hill Cipher</h2>

            <label className="block font-medium">Nhập ma trận khóa (VD: "2 3 3 6"):</label>
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="2 3 3 6"
                value={keyMatrix}
                onChange={(e) => setKeyMatrix(e.target.value)}
            />

            <label className="block mt-4 font-medium">Nhập văn bản gốc:</label>
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
            />
            <button
                className="w-full bg-blue-500 text-white p-2 rounded mt-2"
                onClick={handleEncrypt}
            >
                Mã hóa
            </button>

            <label className="block mt-4 font-medium">Nhập văn bản mã hóa:</label>
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={cipherText}
                onChange={(e) => setCipherText(e.target.value)}
            />
            <button
                className="w-full bg-green-500 text-white p-2 rounded mt-2"
                onClick={handleDecrypt}
            >
                Giải mã
            </button>

            {result && <p className="mt-4 p-2 bg-gray-200 rounded">{result}</p>}
            <Footer/>
        </div>
    );
}

export default HillCipher;