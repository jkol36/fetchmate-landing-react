import React from 'react'
import ReactDOM from 'react-dom'
import makeRoutes from './routes'
import App from 'containers/app'


const routes = makeRoutes()

// Render the React application to the DOM
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
