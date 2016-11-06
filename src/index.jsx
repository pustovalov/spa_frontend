import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import { browserHistory, Router } from 'react-router'
import routes from './routes'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
