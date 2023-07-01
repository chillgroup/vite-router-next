import React from 'react'
import ReactDOM from 'react-dom/client'
import routes from 'vite-router-next/routes'
import App from './App.tsx'
import './index.css'

console.log(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
