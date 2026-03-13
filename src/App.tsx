import Logo from './assets/geonote-logo.png'

const App = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--surface-ground)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={Logo} alt="logo" style={{ width: '100px', height: '100px' }} />
        </a>
      </div>
      <h1>GeoNote</h1>
      <div>🚧 Under construction... 🚧</div>
    </div>
  )
}

export default App
