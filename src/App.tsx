import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/authentification/login/LoginPage'
import TestsAPI from './pages/TestsAPI'
import EpreuvesPage from './pages/epreuves/EpreuvesPage'
import TestsAccueil from './pages/TestsAccueil'
import SignUpPage from './pages/authentification/signup/SignUpPage'
import TestsComponents from './pages/TestsComponents'


function App() {
  return (
    <Routes>
      { /* Authentification */ }
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/invitation/:jeton" element={<SignUpPage />} />

      { /* Sessions*/ }
      <Route path="/accueil" element={<TestsAccueil />} />

      { /* Examens/épreuves */ }
      <Route path="/sessions/:sessionId/epreuves" element={<EpreuvesPage />} />
    
      { /* Autre */ }
      <Route path="/tests" element={<TestsAPI />} />

      { /* Tests Composants */ }
      <Route path="/tests2" element={<TestsComponents />} />

    </Routes>
  )
}

export default App
