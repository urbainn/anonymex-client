import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import TestsAPI from './pages/TestsAPI'
import EpreuvesPage from './pages/epreuves/EpreuvesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tests" element={<TestsAPI />} />
      <Route path="/examens" element={<EpreuvesPage />} />
    </Routes>
  )
}

export default App
