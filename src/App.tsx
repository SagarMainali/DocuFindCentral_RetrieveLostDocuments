import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <div className="">
      <Routes >
        <Route path='/' element={<Layout />} >
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
