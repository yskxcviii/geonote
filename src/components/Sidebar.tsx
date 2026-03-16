import { Card } from 'primereact/card'

export const Sidebar = () => {
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
}

const pt: GeoNote.ComponentPt<{ name: 'root'; component: 'card' }> = {
  root: {
    root: {
      style: { width: '32rem', height: '100%' },
    },
    body: {
      style: { height: '100%' },
    },
    content: {
      style: { height: '100%' },
    },
  },
}
