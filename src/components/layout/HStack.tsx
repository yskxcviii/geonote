import { THEME } from '@/constants'

type Props = {
  children: React.ReactNode
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  items?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  style?: React.CSSProperties
}

export const HStack = ({ children, justify = 'start', items = 'start', style }: Props) => {
  return <div style={{ ...styles.root, justifyContent: justify, alignItems: items, ...style }}>{children}</div>
}

const styles: GeoNote.ComponentStyles<'root'> = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    width: '100%',
    height: '100%',
  },
}
