import React from 'react'
import { render } from 'react-dom'
import App from './containers/App.jsx'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <App store={store} />,
  document.getElementById('app')
)
