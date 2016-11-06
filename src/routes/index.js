import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from '../containers/App.jsx'
import PostsPage from '../containers/PostsPage.jsx'
import PostPage from '../containers/PostPage.jsx'
import NotFound from '../components/NotFound.jsx'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={PostsPage} />
      <Route path="posts" component={PostsPage} />
      <Route path="/posts/:id" component={PostPage} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
)
