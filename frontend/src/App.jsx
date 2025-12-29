import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import ConsumerDashboard from './pages/ConsumerDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConsumerDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
