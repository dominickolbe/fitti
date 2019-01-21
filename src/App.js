import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';
import Login from './pages/Login';
import Start from './pages/Start';

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <Switch>
        <Route path='/login' component={Login} exact />
        <Route path='/' component={Start} />
      </Switch>
    </Router>
  </FirebaseContext.Provider>
);

export default App;
