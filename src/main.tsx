import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from './redux/store'
import App from './App.tsx'
import { I18nextProvider } from 'react-i18next'
import i18next from './translations/i18nextConfig.ts'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter >
          <App />
        </BrowserRouter >
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
)
