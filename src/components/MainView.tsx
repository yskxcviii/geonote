import { memo } from 'react'
import { Card } from 'primereact/card'

export const MainView = memo(() => {
  const pt: GeoNote.ComponentPt<{ name: 'root'; component: 'card' }> = {
    root: {
      root: {
        style: { width: '100%', height: '100%', overflow: 'hidden' },
      },
      body: {
        style: { height: '100%' },
      },
      content: {
        style: { height: '100%' },
      },
    },
  }

  return (
    <Card pt={pt.root}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        🚧 Under construction... 🚧
      </div>
    </Card>
  )
})
