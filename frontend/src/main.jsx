import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx' 
import { EditContextProvider } from './context/EditContext.jsx'


createRoot(document.getElementById('root')).render(
  
  
    <AuthContextProvider>
      <EditContextProvider>
        <App />
      </EditContextProvider>
    </AuthContextProvider>
  
)
