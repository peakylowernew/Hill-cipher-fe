function modInverse(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

function getDeterminant(matrix, size) {
  if (size === 1) return matrix[0];
  if (size === 2) {
    return matrix[0]*matrix[3] - matrix[1]*matrix[2];
  }

  let det = 0;
  for (let i = 0; i < size; i++) {
    let subMatrix = [];
    for (let j = 1; j < size; j++) {
      for (let k = 0; k < size; k++) {
        if (k !== i) subMatrix.push(matrix[j * size + k]);
      }
    }
    det += matrix[i] * getDeterminant(subMatrix, size - 1) * (i % 2 === 0 ? 1 : -1);
  }
  return det;
}

export function generateInvertibleMatrix(n) {
  let matrix;
  while (true) {
    matrix = Array.from({ length: n * n }, () => Math.floor(Math.random() * 26));
    const det = getDeterminant(matrix, n);
    const detMod26 = ((det % 26) + 26) % 26;
    if (modInverse(detMod26, 26)) return matrix;
  }
}
