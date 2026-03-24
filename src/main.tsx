import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider, PrimeReactPTOptions } from 'primereact/api'
import 'normalize.css'
import 'primereact/resources/themes/soho-dark/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '@vscode/codicons/dist/codicon.css'
import '@/index.css'
import App from '@/App.tsx'
import { THEME } from '@/constants'

const pt: PrimeReactPTOptions = {
  button: {
    root: {
      className: 'p-button-sm',
    },
  },
  card: {
    body: {
      style: {
        padding: '0.75rem',
      },
    },
    content: {
      style: {
        padding: '0',
      },
    },
  },
  accordiontab: {
    headerAction: {
      style: {
        padding: '0.75rem',
        backgroundColor: 'var(--surface-section)',
      },
    },
    content: {
      style: {
        backgroundColor: 'var(--surface-section)',
      },
    },
  },
  tooltip: {
    root: {
      style: {
        padding: '0',
      },
    },
    text: {
      style: {
        padding: THEME.spacing.xs,
        fontSize: '0.75rem',
      },
    },
    arrow: {
      style: {
        display: 'none',
      },
    },
  },
  message: {
    root: {
      style: {
        padding: THEME.spacing.xs,
      },
    },
    text: {
      style: {
        padding: THEME.spacing.xs,
        fontSize: '0.75rem',
      },
    },
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{ pt }}>
      <App />
    </PrimeReactProvider>
  </StrictMode>
)
