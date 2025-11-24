import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UploadPage from './components/UploadZone';
import DashboardPage from './components/DashboardPage';
import DetailPage from './components/DetailPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </>
  );
}