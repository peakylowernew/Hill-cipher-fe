const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log("API URL:", API_BASE_URL);

export async function encryptText(text, keyMatrixString) {
    try {

        // Chuyển chuỗi thành ma trận số
        const keyMatrix = keyMatrixString
            // .trim()
            // .split(" ")
            .map(Number); // Chuyển từng phần tử thành số nguyên

        // Kiểm tra kích thước ma trận (2x2 hoặc 3x3)
        let matrixSize = Math.sqrt(keyMatrix.length);
        if (![2, 3].includes(matrixSize) || !Number.isInteger(matrixSize)) {
            throw new Error("Ma trận khóa không hợp lệ! Chỉ hỗ trợ 2x2 hoặc 3x3.");
        }

        // Chuyển thành mảng 2D
        let formattedKeyMatrix = [];
        for (let i = 0; i < matrixSize; i++) {
            formattedKeyMatrix.push(keyMatrix.slice(i * matrixSize, (i + 1) * matrixSize));
        }

        const response = await fetch(`${API_BASE_URL}/api/hill/encrypt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, keyMatrix: formattedKeyMatrix }),
        });

        console.log("Raw Response:", response);

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.encryptedText) {
            throw new Error("Invalid encryptedText received");
        }

        return data;
    } catch (error) {
        console.error("Lỗi gọi API mã hóa:", error);
        return { encryptedText: '', processSteps: [] };  // Trả về chuỗi thay vì null để tránh lỗi React
    }
}

export async function decryptText(text, keyMatrixString) {
    try {
        // Chuyển chuỗi thành ma trận số
        const keyMatrix = keyMatrixString
            .trim()
            .split(" ")
            .map(Number); // Chuyển từng phần tử thành số nguyên

        // Kiểm tra kích thước ma trận (2x2 hoặc 3x3)
        let matrixSize = Math.sqrt(keyMatrix.length);
        if (![2, 3].includes(matrixSize) || !Number.isInteger(matrixSize)) {
            throw new Error("Ma trận khóa không hợp lệ! Chỉ hỗ trợ 2x2 hoặc 3x3.");
        }

        // Chuyển thành mảng 2D (ma trận)
        let formattedKeyMatrix = [];
        for (let i = 0; i < matrixSize; i++) {
            formattedKeyMatrix.push(keyMatrix.slice(i * matrixSize, (i + 1) * matrixSize));
        }

        // Gửi ma trận đúng định dạng lên backend
        const response = await fetch(`${API_BASE_URL}/api/hill/decrypt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, keyMatrix: formattedKeyMatrix }), // 💡 Fix lỗi ở đây
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.decryptedText;
    } catch (error) {
        console.error("Lỗi giải mã:", error);
        return null;
    }
}
