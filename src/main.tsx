import React from 'react'
import ReactDOM from 'react-dom'

import AppController from './contexts/AppContext'
import App from './App'

import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <AppController>
      <App/>
    </AppController>
  </React.StrictMode>,
  document.getElementById('root')
)
