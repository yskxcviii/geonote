// import { useState } from 'react'
// import { Accordion, AccordionTab } from 'primereact/accordion'
// import { Button } from 'primereact/button'
// import { Sidebar } from 'primereact/sidebar'
// import { GoogleMap } from './components/GoogleMap'
// import { LayerPanel } from './components/LayerPanel'
// import { useLayers } from './hooks/useLayers'

// const SIDEBAR_WIDTH = 320

// const App_ = () => {
//   const {
//     layers,
//     groups,
//     isLoading: layersLoading,
//     addLayersFromFiles,
//     removeLayer,
//     removeGroup,
//     toggleLayerVisibility,
//     toggleGroupVisibility,
//     toggleGroupExpanded,
//     setLayerColor,
//     removeAllLayers,
//     getGeoJsonData,
//   } = useLayers()

//   const styles = {
//     layout: {
//       display: 'flex',
//       width: '100vw',
//       height: '100vh',
//       overflow: 'hidden',
//       backgroundColor: 'var(--surface-0)',
//     },
//     main: {
//       flex: 1,
//       minWidth: 0,
//       marginLeft: 0,
//       transition: 'margin-left 0.25s ease-out',
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     mainWithPanelOpen: {
//       marginLeft: SIDEBAR_WIDTH,
//     },
//     mainHeader: {
//       position: 'sticky' as const,
//       top: 0,
//       zIndex: 100,
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       padding: '0.75rem 1rem',
//       backgroundColor: 'var(--surface-0)',
//       borderBottom: '1px solid var(--surface-200)',
//     },
//     sidebarHeader: { margin: 0, fontSize: '1.25rem', fontWeight: 600 },
//     headerTitle: { fontWeight: 600 },
//   } as const

//   const [menuOpen, setMenuOpen] = useState(true)
//   const [accordionActiveIndex, setAccordionActiveIndex] = useState<number | number[]>([0, 1])

//   return (
//     <div style={styles.layout}>
//       <Sidebar
//         id="app-sidebar"
//         visible={menuOpen}
//         onHide={() => setMenuOpen(false)}
//         position="left"
//         modal={false}
//         dismissable={false}
//         style={{ width: `${SIDEBAR_WIDTH}px` }}
//         header={<h2 style={styles.sidebarHeader}>メニュー</h2>}
//       >
//         <Accordion
//           multiple
//           activeIndex={accordionActiveIndex}
//           onTabChange={(e) => setAccordionActiveIndex(e.index ?? 0)}
//           style={{ border: 'none' }}
//         >
//           <AccordionTab header="レイヤー">
//             <LayerPanel
//               layers={layers}
//               groups={groups}
//               isLoading={layersLoading}
//               onImport={addLayersFromFiles}
//               onToggleVisibility={toggleLayerVisibility}
//               onToggleGroupVisibility={toggleGroupVisibility}
//               onToggleGroupExpanded={toggleGroupExpanded}
//               onColorChange={setLayerColor}
//               onRemove={removeLayer}
//               onRemoveGroup={removeGroup}
//               onRemoveAll={removeAllLayers}
//             />
//           </AccordionTab>
//           <AccordionTab header="マーカー">
//             <div
//               style={{
//                 fontSize: '0.85rem',
//                 color: 'var(--text-color-secondary)',
//                 padding: '0.5rem 0',
//               }}
//             >
//               マーカーはここに表示されます。
//             </div>
//           </AccordionTab>
//         </Accordion>
//       </Sidebar>

//       <main style={{ ...styles.main, ...(menuOpen ? styles.mainWithPanelOpen : {}) }}>
//         <header style={styles.mainHeader}>
//           <Button
//             icon="pi pi-bars"
//             rounded
//             text
//             aria-label="メニューを開く"
//             aria-controls={menuOpen ? 'app-sidebar' : undefined}
//             aria-expanded={menuOpen}
//             onClick={() => setMenuOpen((o) => !o)}
//           />
//           <span style={styles.headerTitle}>GeoNote</span>
//         </header>

//         <div style={{ flex: 1, minHeight: 0 }}>
//           <GoogleMap darkMode={true} layers={layers} groups={groups} getGeoJsonData={getGeoJsonData} />
//         </div>
//       </main>
//     </div>
//   )
// }

import { CSSProperties } from 'react'

type StyleKeys = 'root'

type Styles<T extends string> = { [key in T]: CSSProperties }

const styles: Styles<StyleKeys> = {
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: 'var(--surface-0)',
  },
}

const App = () => {
  return <div style={styles.root}>foo</div>
}

export default App
