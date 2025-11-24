// src/components/DashboardPage.jsx
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  // ✅ Чтение данных из localStorage один раз при инициализации
  const [data] = useState(() => {
    const saved = localStorage.getItem('predictions');
    return saved ? JSON.parse(saved) : null;
  });

  if (!data) {
    return <div className="container"><p>Данные не загружены. Перейдите на главную.</p></div>;
  }

  // Пример данных для графиков
  const dates = ['2020-08-01', '2020-08-02', '2020-08-03', '2020-08-04', '2020-08-05'];
  const temps = [36.2, 45.6, 109.4, 190.0, 243.1];

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Температура, °C',
        data: temps,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="container">
      <h2>📊 Дашборд</h2>
      <div className="card">
        <h3>Температура по дням</h3>
        <div style={{ height: '300px' }}>
          <Line data={lineData} />
        </div>
      </div>
      <div className="card">
        <h3>Календарь прогнозов</h3>
        <div className="calendar">
          {data.predictions?.slice(0, 5).map((p, i) => (
            <div key={i} className="calendar-item">
              <div className="calendar-date">{p.date}</div>
              <div className="calendar-label">{p.location}</div>
            </div>
          )) || <p>Нет данных</p>}
        </div>
      </div>
      <div className="card">
        <h3>Сводка</h3>
        <p>Всего прогнозов: {data.total || 0}</p>
        <p>Высокий риск: {data.highRisk || 0}</p>
      </div>
    </div>
  );
}