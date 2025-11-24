// src/components/DetailPage.jsx
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function DetailPage() {
  const [data] = useState(() => {
    const saved = localStorage.getItem('predictions');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedStack, setSelectedStack] = useState('');

  if (!data) {
    return <div className="container"><p>Данные не загружены.</p></div>;
  }

  const warehouses = [...new Set(data.stacks?.map(s => s.warehouse) || [])];
  const stacks = selectedWarehouse
    ? data.stacks?.filter(s => s.warehouse === selectedWarehouse) || []
    : [];

  const stackData = stacks.find(s => s.id === selectedStack);

  // ✅ Проверяем, что stackData существует перед обращением к его свойствам
  const chartData = stackData
    ? {
        labels: Array.isArray(stackData.dates) ? stackData.dates : [],
        datasets: [
          {
            label: 'Температура, °C',
            data: Array.isArray(stackData.temps) ? stackData.temps : [],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }
        ]
      }
    : null;

  return (
    <div className="container">
      <h2>🔍 Подробнее</h2>
      <div className="card">
        <div>
          <label>Склад: </label>
          <select value={selectedWarehouse} onChange={(e) => setSelectedWarehouse(e.target.value)}>
            <option value="">Выберите склад</option>
            {warehouses.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
        {selectedWarehouse && (
          <div style={{ marginTop: '1rem' }}>
            <label>Штабель: </label>
            <select value={selectedStack} onChange={(e) => setSelectedStack(e.target.value)}>
              <option value="">Выберите штабель</option>
              {stacks.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {chartData && (
        <div className="card">
          <h3>График температуры</h3>
          <div style={{ height: '300px' }}>
            <Line data={chartData} />
          </div>
          <h4>Сводка по штабелю</h4>
          <p>Прогноз: {stackData.forecast || '—'}</p>
          <p>Последняя температура: {stackData.lastTemp || '—'} °C</p>
        </div>
      )}
    </div>
  );
}