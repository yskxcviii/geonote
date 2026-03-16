import { memo } from 'react'
import { Card } from 'primereact/card'

type Props = {
  width: string
}

export const Sidebar = memo(({ width }: Props) => {
  const pt: GeoNote.ComponentPt<{ name: 'root'; component: 'card' }> = {
    root: {
      root: {
        style: { width, height: '100%' },
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
