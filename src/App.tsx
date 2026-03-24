import { Header } from '@/components/Header'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { MainView } from '@/components/MainView'
import { VStack } from '@/components/layout/VStack'
import { HStack } from '@/components/layout/HStack'
import { THEME } from '@/constants'
import { useState } from 'react'

const SIDEBAR_WIDTH = '24rem'
const GRID_TRANSITION_MS = 250

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true)

  const onToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  const styles: GeoNote.ComponentStyles<'root' | 'mainContent'> = {
    root: {
      width: '100vw',
      height: '100vh',
      backgroundColor: THEME.color.background,
      padding: THEME.spacing.sm,
      gap: THEME.spacing.sm,
    },
    mainContent: {
      display: 'grid',
      width: '100%',
      height: '100%',
      transition: `grid-template-columns ${GRID_TRANSITION_MS}ms ease, gap ${GRID_TRANSITION_MS}ms ease`,
      gridTemplateColumns: sidebarVisible ? `${SIDEBAR_WIDTH} 1fr` : '0rem 1fr',
      gap: sidebarVisible ? THEME.spacing.sm : 0,
    },
  }

  return (
    <VStack style={styles.root}>
      <Header onToggleSidebar={onToggleSidebar} />
      <HStack style={styles.mainContent}>
        <Sidebar width={SIDEBAR_WIDTH} visible={sidebarVisible} />
        <MainView />
      </HStack>
    </VStack>
  )
}

export default App
