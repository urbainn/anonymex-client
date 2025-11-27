import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import TestsAPI from './pages/TestsAPI'
import EpreuvesPage from './pages/epreuves/EpreuvesPage'
import SignUpPage from './pages/signup/SignUpPage'
import TestsComponents from './pages/TestsComponents'
import  SessionPage from './pages/sessions/SessionPage'


function App() {
  return (
    <Routes>
      { /* Authentification */ }
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/invitation/:jeton" element={<SignUpPage />} />

      { /* Sessions*/ }
      <Route path="/accueil" element={<SessionPage />} />

      { /* Examens/épreuves */ }
      <Route path="/examens" element={<EpreuvesPage />} />
    
      { /* Autre */ }
      <Route path="/tests" element={<TestsAPI />} />

      { /* Tests Composants */ }
      <Route path="/tests2" element={<TestsComponents />} />

    </Routes>
  )
}

export default App
