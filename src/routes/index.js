import React from 'react';
import { Route, IndexRedirect} from 'react-router';
import App from '../containers/app'



export default () => [
  (
    <Route path='/' component={App} key='app'>
    </Route>
  )]
