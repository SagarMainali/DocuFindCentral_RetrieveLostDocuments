import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

function App() {

  return (
    <div className="">
      <Routes >
        <Route index element={<Layout />} />
      </Routes>
    </div>
  )
}

export default App
