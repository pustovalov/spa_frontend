import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from 'App'
import PostsPage from 'PostsPage'
import PostPage from 'PostPage'
import LoginPage from 'LoginPage'
import SignUpPage from 'SignUpPage'
import AdminPage from 'AdminPage'
import SettingsPage from 'SettingsPage'
import NotFound from 'NotFound'


export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={PostsPage} />
      <Route path="posts" component={PostsPage} />
      <Route path="/posts/:id" component={PostPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/sign_up" component={SignUpPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/settings" component={SettingsPage} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
)
