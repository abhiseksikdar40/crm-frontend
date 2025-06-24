import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ marginLeft: '200px', padding: '20px', width: '100%' }}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
