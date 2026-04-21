import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import PaginaAluno from './pages/PaginaAluno'
import PaginaMonitor from './pages/PaginaMonitor'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaAluno />} />
        <Route path='/monitor' element={<PaginaMonitor />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
