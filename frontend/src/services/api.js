// src/services/api.js
const API_BASE = 'http://localhost:8080'; // или ваш URL

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Ошибка при загрузке');
  }

  return response.json();
}