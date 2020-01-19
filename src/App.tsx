import React from 'react';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import history from './config/history';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

export default function App() {
  return (
    <Router history={history}>
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
    </Router>
  );
}