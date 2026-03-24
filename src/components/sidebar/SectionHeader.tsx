import { HStack } from '@/components/layout/HStack'
import { THEME } from '@/constants'

type Props = {
  icon: string
  iconColor?: string
  title: string
}

export const SectionHeader = ({ icon, iconColor, title }: Props) => {
  const styles: GeoNote.ComponentStyles<'root' | 'icon' | 'title'> = {
    root: {
      position: 'relative',
    },
    icon: {
      fontSize: '1.25rem',
      color: iconColor || THEME.color.primary,
    },
    title: {
      alignItems: 'center',
      paddingLeft: THEME.spacing.sm,
    },
  }

  return (
    <HStack style={styles.title}>
      <i className={icon} style={styles.icon} />
      <span>{title}</span>
    </HStack>
  )
}
