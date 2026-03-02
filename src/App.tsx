import { useState } from 'react'
import { Button } from 'primereact/button'

const severities = [undefined, 'secondary', 'success', 'info', 'warning', 'danger', 'help', 'contrast'] as const

const styles = {
  wrapper: { padding: '1rem', textAlign: 'left' as const },
  title: { textAlign: 'center' as const, marginBottom: '2rem' },
  section: { marginBottom: '2.5rem' },
  sectionTitle: { fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 600 as const },
  buttonRow: { display: 'flex' as const, flexWrap: 'wrap' as const, gap: '0.5rem', alignItems: 'center' as const },
  buttonRowAlign: { alignItems: 'center' as const },
} as const

function App() {
  const [loading, setLoading] = useState(false)

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Buttons</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Severity (重要度)</h2>
        <div style={styles.buttonRow}>
          <Button label="Primary" />
          <Button label="Secondary" severity="secondary" />
          <Button label="Success" severity="success" />
          <Button label="Info" severity="info" />
          <Button label="Warning" severity="warning" />
          <Button label="Danger" severity="danger" />
          <Button label="Help" severity="help" />
          <Button label="Contrast" severity="contrast" />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Outlined (枠線)</h2>
        <div style={styles.buttonRow}>
          {severities.map((s) => (
            <Button key={s ?? 'primary'} label={s ?? 'Primary'} severity={s} outlined />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Text (テキストのみ)</h2>
        <div style={styles.buttonRow}>
          {severities.map((s) => (
            <Button key={s ?? 'primary'} label={s ?? 'Primary'} severity={s} text />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Raised (影付き)</h2>
        <div style={styles.buttonRow}>
          <Button label="Primary" raised />
          <Button label="Secondary" severity="secondary" raised />
          <Button label="Success" severity="success" raised />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Rounded (丸型)</h2>
        <div style={styles.buttonRow}>
          <Button label="Primary" rounded />
          <Button label="Secondary" severity="secondary" rounded />
          <Button icon="pi pi-heart" rounded />
          <Button icon="pi pi-heart" severity="danger" rounded />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Link (リンク風)</h2>
        <div style={styles.buttonRow}>
          <Button label="Primary" link />
          <Button label="Secondary" severity="secondary" link />
          <Button label="Danger" severity="danger" link />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Plain (プレーン)</h2>
        <div style={styles.buttonRow}>
          <Button label="Primary" plain />
          <Button label="Secondary" severity="secondary" plain />
          <Button label="Danger" severity="danger" plain />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Size (サイズ)</h2>
        <div style={{ ...styles.buttonRow, ...styles.buttonRowAlign }}>
          <Button label="Small" size="small" />
          <Button label="Normal" />
          <Button label="Large" size="large" />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Icon (アイコン)</h2>
        <div style={styles.buttonRow}>
          <Button label="Left" icon="pi pi-check" />
          <Button label="Right" icon="pi pi-check" iconPos="right" />
          <Button label="Top" icon="pi pi-check" iconPos="top" />
          <Button label="Bottom" icon="pi pi-check" iconPos="bottom" />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Icon Only (アイコンのみ)</h2>
        <div style={styles.buttonRow}>
          <Button icon="pi pi-star" />
          <Button icon="pi pi-star" severity="secondary" />
          <Button icon="pi pi-trash" severity="danger" />
          <Button icon="pi pi-search" severity="help" />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Loading (読み込み中)</h2>
        <div style={styles.buttonRow}>
          <Button label="Loading" loading onClick={handleLoadingClick} />
          <Button label="Loading" loading={loading} icon="pi pi-check" onClick={handleLoadingClick} />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Disabled (無効)</h2>
        <div style={styles.buttonRow}>
          <Button label="Primary" disabled />
          <Button label="Outlined" outlined disabled />
          <Button label="Text" text disabled />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Badge (バッジ)</h2>
        <div style={styles.buttonRow}>
          <Button label="Notifications" icon="pi pi-bell" badge="3" />
          <Button
            label="Messages"
            icon="pi pi-envelope"
            severity="secondary"
            badge="7"
            badgeClassName="p-badge-danger"
          />
        </div>
      </section>
    </div>
  )
}

export default App
