import React from 'react';
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/register'>
          <Register/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </HashRouter>
  );
}