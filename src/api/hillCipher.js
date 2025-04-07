const API_BASE_URL = process.env.REACT_APP_API_URL;

export async function encryptText(text, keyMatrixString) {
    try {console.log("key: ",keyMatrixString);
        const keyMatrix = keyMatrixString;
        
        let matrixSize = Math.sqrt(keyMatrix.length);

        let formattedKeyMatrix = [];
        for (let i = 0; i < matrixSize; i++) {
            formattedKeyMatrix.push(keyMatrix.slice(i * matrixSize, (i + 1) * matrixSize));
        }

        const response = await fetch(`${API_BASE_URL}/api/hill/encrypt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, keyMatrix: formattedKeyMatrix }),
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Nếu không có encryptedText hoặc processSteps, trả về dữ liệu mặc định
        if (!data.encryptedText) {
            throw new Error("Không có dữ liệu mã hóa");
        }

        const processSteps = data.steps || []; // Đảm bảo rằng processSteps không bị undefined
        return {
            encryptedText: data.encryptedText,
            processSteps: processSteps, // Trả về processSteps
        };
    } catch (error) {
        console.error("Lỗi gọi API mã hóa:", error);
        return { encryptedText: '', processSteps: [] };  // Trả về mảng trống nếu có lỗi
    }
}


export async function decryptText(text, keyMatrixString) {
    try {
        // Chuyển chuỗi thành ma trận số
        const keyMatrix = keyMatrixString
            // .trim()
            // .split(" ")
            .map(Number); // Chuyển từng phần tử thành số nguyên

        // Kiểm tra kích thước ma trận (2x2 hoặc 3x3)
        let matrixSize = Math.sqrt(keyMatrix.length);

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
        console.log("API response:", response);
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("API Response:", data);

        return data;
    } catch (error) {
        console.error("Lỗi giải mã:", error);
        return null;
    }
}
