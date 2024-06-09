import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tempapp from './components/TempApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Tempapp />
    </div>
  )
}

export default App
