import { memo } from 'react'
import { Card } from 'primereact/card'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { SectionHeader } from '@/components/sidebar/SectionHeader'
import { THEME } from '@/constants'

type Props = {
  width: string
  visible: boolean
  isMobile: boolean
}

export const Sidebar = memo(({ width, visible, isMobile }: Props) => {
  const styles: GeoNote.ComponentStyles<'root'> = {
    root: {
      width: '100%',
      height: '100%',
      minWidth: 0,
      overflow: 'hidden',
      position: isMobile ? 'absolute' : 'static',
      inset: isMobile ? 0 : undefined,
      zIndex: isMobile ? 10 : undefined,
      pointerEvents: visible ? 'auto' : 'none',
    },
  }

  const pt: GeoNote.ComponentPt<{ name: 'card'; component: 'card' } | { name: 'message'; component: 'tooltip' }> = {
    card: {
      root: {
        style: {
          width: isMobile ? '100%' : width,
          minWidth: isMobile ? '100%' : width,
          maxWidth: isMobile ? '100%' : width,
          height: '100%',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: isMobile ? (visible ? 'translateX(0)' : 'translateX(-8px)') : 'none',
          transition: isMobile ? 'opacity 150ms ease, transform 200ms ease' : 'opacity 150ms ease',
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
