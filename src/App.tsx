import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import TestsAPI from './pages/TestsAPI'
import EpreuvesPage from './pages/epreuves/EpreuvesPage'
import TestsAccueil from './pages/TestsAccueil'
import SignUpPage from './pages/signup/SignUpPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tests" element={<TestsAPI />} />
      <Route path="/examens" element={<EpreuvesPage />} />
      <Route path="/accueil" element={<TestsAccueil />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  )
}

export default App
