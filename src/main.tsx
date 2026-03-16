import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider, PrimeReactPTOptions } from 'primereact/api'
import 'normalize.css'
import 'primereact/resources/themes/soho-dark/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '@/index.css'
import App from '@/App.tsx'

const pt: PrimeReactPTOptions = {
  button: {
    root: { className: 'p-button-sm' },
  },
  card: {
    body: { style: { padding: '0.75rem' } },
    content: { style: { padding: 'unset' } },
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{ pt }}>
      <App />
    </PrimeReactProvider>
  </StrictMode>
)
