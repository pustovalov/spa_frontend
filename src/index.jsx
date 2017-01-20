import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
import { browserHistory, Router } from 'react-router'

import { IntlProvider, addLocaleData } from 'react-intl'
import ru from 'react-intl/locale-data/ru'
import ruMessages from './l10n/ru.json'
import enMessages from './l10n/en.json'
addLocaleData([...ru])

import routes from './routes'

const store = configureStore()
const locale = store.getState().userReducer.locale
let messages = ''

if (locale == "en") {
  messages = enMessages
} else {
  messages = ruMessages
}

render(
  <Provider store={store}>
    <IntlProvider locale={ locale } messages={ messages }>
      <Router history={browserHistory} routes={routes} />
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
)
