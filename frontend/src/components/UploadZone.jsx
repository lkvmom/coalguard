import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../services/api';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && f.name.endsWith('.csv')) {
      setFile(f);
      setError('');
    } else {
      setError('Файл должен быть CSV');
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Выберите файл');
      return;
    }

    setLoading(true);
    try {
      const data = await uploadFile(file);
      localStorage.setItem('predictions', JSON.stringify(data)); // временно
      navigate('/dashboard');
    } catch (err) {
      setError('Ошибка загрузки: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Загрузка CSV-файла</h2>
      <div className="card">
        <div className="upload-zone">
          <label className="upload-trigger">
            📁 Выберите CSV-файл
            <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
          {file && <p className="file-info">Выбран файл: {file.name}</p>}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleSubmit} disabled={loading} className="btn">
          {loading ? 'Загрузка...' : 'Отправить на сервер'}
        </button>
      </div>
    </div>
  );
}