import { THEME } from '@/constants'

type Props = {
  children: React.ReactNode
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  items?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  gap?: string
  style?: React.CSSProperties
}

export const HStack = ({ children, justify = 'start', items = 'start', gap = THEME.spacing.sm, style }: Props) => {
  const styles: GeoNote.ComponentStyles<'root'> = {
    root: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
    },
  }

  return <div style={{ ...styles.root, justifyContent: justify, alignItems: items, gap, ...style }}>{children}</div>
}
