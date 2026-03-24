import { memo } from 'react'
import { Card } from 'primereact/card'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { SectionHeader } from '@/components/sidebar/SectionHeader'
import { THEME } from '@/constants'

type Props = {
  width: string
  visible: boolean
}

export const Sidebar = memo(({ width, visible }: Props) => {
  const styles: GeoNote.ComponentStyles<'root'> = {
    root: {
      width: '100%',
      height: '100%',
      minWidth: 0,
      overflow: 'hidden',
    },
  }

  const pt: GeoNote.ComponentPt<{ name: 'card'; component: 'card' } | { name: 'message'; component: 'tooltip' }> = {
    card: {
      root: {
        style: {
          width,
          minWidth: width,
          maxWidth: width,
          height: '100%',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transition: 'opacity 150ms ease',
        },
      },
      body: {
        style: { height: '100%', overflow: 'hidden' },
      },
      content: {
        style: { height: '100%', overflow: 'hidden' },
      },
    },
    message: {
      text: {
        style: {
          padding: '0',
        },
      },
    },
  }

  return (
    <div style={styles.root}>
      <Card pt={pt.card}>
        <Accordion
          expandIcon={<i className="codicon codicon-triangle-right" />}
          collapseIcon={<i className="codicon codicon-triangle-down" />}
          multiple
        >
          <AccordionTab
            header={
              <SectionHeader icon="codicon codicon-file-code" iconColor={THEME.color.warning} title="入力ソース" />
            }
          >
            <div>🚧 Under construction... 🚧</div>
          </AccordionTab>

          <AccordionTab
            header={
              <SectionHeader icon="codicon codicon-collection" iconColor={THEME.color.secondary} title="行政区域" />
            }
            pt={{ root: { className: 'sidebar-section-disabled' } }}
            disabled={false}
          >
            <div>🚧 Under construction... 🚧</div>
          </AccordionTab>

          <AccordionTab
            header={<SectionHeader icon="codicon codicon-git-branch" iconColor={THEME.color.help} title="鉄道路線" />}
            pt={{ root: { className: 'sidebar-section-disabled' } }}
            disabled={false}
          >
            <div>🚧 Under construction... 🚧</div>
          </AccordionTab>

          <AccordionTab
            header={<SectionHeader icon="codicon codicon-location" iconColor={THEME.color.danger} title="マーカー" />}
          >
            <div>🚧 Under construction... 🚧</div>
          </AccordionTab>
        </Accordion>
      </Card>
    </div>
  )
})
