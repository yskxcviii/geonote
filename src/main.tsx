import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import 'normalize.css'
import 'primereact/resources/themes/soho-dark/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider
      value={{
        pt: {
          button: {
            root: { className: 'p-button-sm' },
          },
        },
      }}
    >
      <App />
    </PrimeReactProvider>
  </StrictMode>
)
