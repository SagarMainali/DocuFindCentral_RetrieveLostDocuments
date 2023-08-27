import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import PageNotFound from './pages/PageNotFound'
import LostDocument from './pages/LostDocument'
import FoundDocument from './pages/FoundDocument'

function App() {

  return (
    <div className="">
      <Routes >
        <Route path='/' element={<Layout />} >
          <Route index element={<LandingPage />} />
          <Route path='lost-document' element={<LostDocument />} />
          <Route path='found-document' element={<FoundDocument />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
