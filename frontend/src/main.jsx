import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth from './components/auth.jsx'
import LandingPage from './components/LandingPage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <LandingPage/> */}
    <Auth/>
  </StrictMode>,
)
