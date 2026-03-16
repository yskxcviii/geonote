import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { MainView } from '@/components/MainView'
import { VStack } from '@/components/layout/VStack'
import { HStack } from '@/components/layout/HStack'
import { THEME } from '@/constants'

const styles: GeoNote.ComponentStyles<'root' | 'mainContent'> = {
  root: {
    width: '100vw',
    height: '100vh',
    backgroundColor: THEME.color.background,
    padding: THEME.spacing.sm,
    gap: THEME.spacing.sm,
  },
  mainContent: {
    width: '100%',
    height: '100%',
  },
}

const App = () => {
  return (
    <VStack style={styles.root}>
      <Header />
      <HStack style={styles.mainContent}>
        <Sidebar />
        <MainView />
      </HStack>
    </VStack>
  )
}

export default App
