const API_BASE_URL = process.env.REACT_APP_API_URL;

export async function encryptText(text, keyMatrixString, userId ) {
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
            body: JSON.stringify({ text, keyMatrix: formattedKeyMatrix, userId  }),
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.encryptedText) {
            throw new Error("Không có dữ liệu mã hóa");
        }

        const processSteps = data.steps || [];
        return {
            encryptedText: data.encryptedText,
            processSteps: processSteps,
            originalText: data.originalText,
        };
    } catch (error) {
        return { encryptedText: '', processSteps: [], originalText: '' };
    }
}

export async function decryptText(text, keyMatrixString, userId, originalText) {
    try {
        const keyMatrix = keyMatrixString.map(Number);

        let matrixSize = Math.sqrt(keyMatrix.length);

        let formattedKeyMatrix = [];
        for (let i = 0; i < matrixSize; i++) {
            formattedKeyMatrix.push(keyMatrix.slice(i * matrixSize, (i + 1) * matrixSize));
        }

        const response = await fetch(`${API_BASE_URL}/api/hill/decrypt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, keyMatrix: formattedKeyMatrix, userId, originalText }),
        });

        console.log("API response:", response);
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data);
        return data;
    } catch (error) {
        console.error("Lỗi khi giải mã:", error.message);
        console.log("Full error object:", error);
        throw error;
    }
}
