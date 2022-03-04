import React from 'react'
import ReactDOM from 'react-dom'

import AppController from './contexts/AppContext'
import ScreenNavigator from './contexts/ScreenContext'

import App from './App'

import './styles/global.css'

ReactDOM.render(
  <React.StrictMode>
    <AppController>
      <ScreenNavigator>
        <App/>
      </ScreenNavigator>
    </AppController>
  </React.StrictMode>,
  document.getElementById('root')
)
