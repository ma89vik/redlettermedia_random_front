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

const backendUrlProd = 'https://fanmenrui.xyz/rlm/api/'
//const backendUrlDev = 'http://localhost:4000'
const backendUrlDev = 'https://fanmenrui.xyz/rlm/api/'
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
