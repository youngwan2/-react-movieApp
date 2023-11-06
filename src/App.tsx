import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'

function App (): JSX.Element {
  return (
    <main className="App">
      <Header />
      <Outlet />
    </main>
  )
}

export default App
