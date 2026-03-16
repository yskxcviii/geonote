import { Card } from 'primereact/card'
import { Image } from 'primereact/image'
import { HStack } from '@/components/layout/HStack'
import logo from '@/assets/geonote-logo.png'
import { Button } from 'primereact/button'

type Props = {
  onToggleSidebar: () => void
}

export const Header = ({ onToggleSidebar }: Props) => {
  const onClickBeaker = () => {
    window.open('https://geonote-proto.netlify.app/', '_blank')
  }

  const onClickGithub = () => {
    window.open('https://github.com/yskxcviii/geonote', '_blank')
  }

  const styles: GeoNote.ComponentStyles<'productName'> = {
    productName: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  }

  const pt: GeoNote.ComponentPt<{ name: 'root'; component: 'card' }> = {
    root: {
      root: {
        style: { width: '100%' },
      },
    },
  }

  return (
    <Card pt={pt.root}>
      <HStack justify="space-between" items="center">
        <HStack items="center">
          <Button
            icon="codicon codicon-three-bars"
            rounded
            link
            onClick={onToggleSidebar}
            pt={{ icon: { style: { fontSize: '1.5rem' } } }}
          />
          <HStack items="center">
            <Image src={logo} alt="GeoNote Logo" width="36px" height="36px" />
            <div style={styles.productName}>GeoNote</div>
          </HStack>
        </HStack>

        <HStack justify="end" items="center">
          <Button
            icon="codicon codicon-beaker"
            rounded
            link
            onClick={onClickBeaker}
            pt={{ icon: { style: { fontSize: '1.5rem' } } }}
            tooltip="Prototype"
            tooltipOptions={{ position: 'bottom' }}
          />
          <Button
            icon="codicon codicon-github-inverted"
            rounded
            link
            onClick={onClickGithub}
            pt={{ icon: { style: { fontSize: '1.5rem' } } }}
            tooltip="GitHub"
            tooltipOptions={{ position: 'bottom' }}
          />
        </HStack>
      </HStack>
    </Card>
  )
}
