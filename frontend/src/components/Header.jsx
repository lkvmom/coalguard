import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <h2>🔥 Прогноз самовозгорания угля</h2>
      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Главная</Link>
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Дашборд</Link>
        <Link to="/detail" className={location.pathname === '/detail' ? 'active' : ''}>Подробнее</Link>
      </nav>
    </header>
  );
}