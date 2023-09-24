import { Routes, Route } from 'react-router-dom'

import Layout from './components/layoutComponent/Layout'
import WelcomePage from './pages/WelcomePage'
import PageNotFound from './pages/handlers/PageNotFound'
import LostDocument from './pages/LostDocument'
import FoundDocument from './pages/FoundDocument'
import SolvedTickets from './pages/SolvedTicketsContainer'
import UnsolvedTickets from './pages/UnsolvedTicketsContainer'
import GreatBeings from './pages/GreatBeings'
import HowItWorks from './pages/HowItWorks'
import Feedback from './pages/Feedback'
import PrivacyPolicy from './pages/PrivacyPolicy'
import AboutUs from './pages/AboutUs'
import { useAppSelector } from './redux/hooks'

import './styles/theme.css';

function App() {

  const isLight = useAppSelector((state) => state.navbar.isLight);

  return (
    <div className={`font-poppins ${isLight ? 'body-light-mode' : 'body-dark-mode'}`}>
      <Routes >
        <Route path='/' element={<Layout />} >
          <Route index element={<WelcomePage />} />
          <Route path='lost-document' element={<LostDocument />} />
          <Route path='found-document' element={<FoundDocument />} />
          <Route path='solved-tickets' element={<SolvedTickets />} />
          <Route path='unsolved-tickets' element={<UnsolvedTickets />} />
          <Route path='great-beings' element={<GreatBeings />} />
          <Route path='how-it-works' element={<HowItWorks />} />
          <Route path='feedback' element={<Feedback />} />
          <Route path='privacy-policy' element={<PrivacyPolicy />} />
          <Route path='about-us' element={<AboutUs />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
