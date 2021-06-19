import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router
} from "react-router-dom"

import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'

const backendUrlProd = 'http://fanmenrui.xyz:4000'
const backendUrlDev = 'http://localhost:4000'
const backendUrl = process.env.NODE_ENV === 'production' ? backendUrlProd : backendUrlDev

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: backendUrl
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
