import { Header } from '@/components/Header'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { MainView } from '@/components/MainView'
import { VStack } from '@/components/layout/VStack'
import { HStack } from '@/components/layout/HStack'
import { THEME } from '@/constants'
import { useEffect, useState } from 'react'

const SIDEBAR_WIDTH = '24rem'
const GRID_TRANSITION_MS = 250
const MOBILE_BREAKPOINT_PX = 768

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT_PX)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`)
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', onChange)

    return () => {
      mediaQuery.removeEventListener('change', onChange)
    }
  }, [])

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
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      transition: isMobile
        ? undefined
        : `grid-template-columns ${GRID_TRANSITION_MS}ms ease, gap ${GRID_TRANSITION_MS}ms ease`,
      gridTemplateColumns: isMobile ? '1fr' : sidebarVisible ? `${SIDEBAR_WIDTH} 1fr` : '0rem 1fr',
      gap: isMobile ? 0 : sidebarVisible ? THEME.spacing.sm : 0,
    },
  }

  return (
    <VStack style={styles.root}>
      <Header onToggleSidebar={onToggleSidebar} />
      <HStack style={styles.mainContent}>
        <Sidebar width={SIDEBAR_WIDTH} visible={sidebarVisible} isMobile={isMobile} />
        <MainView />
      </HStack>
    </VStack>
  )
}

export default App
