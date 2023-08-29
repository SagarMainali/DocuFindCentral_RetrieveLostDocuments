import { Routes, Route } from 'react-router-dom'

import Layout from './components/layoutComponent/Layout'
import WelcomePage from './pages/WelcomePage'
import PageNotFound from './pages/PageNotFound'
import LostDocument from './pages/LostDocument'
import FoundDocument from './pages/FoundDocument'

function App() {

  return (
    <div className="">
      <Routes >
        <Route path='/' element={<Layout />} >
          <Route index element={<WelcomePage />} />
          <Route path='lost-document' element={<LostDocument />} />
          <Route path='found-document' element={<FoundDocument />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
