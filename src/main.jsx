import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import Dashboard from './pages/Dashboard.jsx'
import Leads from './pages/Leads.jsx'
import Sales from './pages/Sales.jsx'
import Agents from './pages/Agents.jsx'
import Reports from './pages/Reports.jsx'
import LoginPage from './components/LoginPage.jsx'
import { CRMProvider } from './context/CRMContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CRMProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<App />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="sales" element={<Sales />} />
          <Route path="agents" element={<Agents />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CRMProvider>
  </StrictMode>
)
