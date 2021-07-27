import { ApolloProvider } from '@apollo/client';
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Landing from './components/pages/landing';
import PokemonSearch from './components/pages/pokemon-search/view';
import apolloClient from './core/apollo'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/pokemon-search" component={PokemonSearch}/>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App;
