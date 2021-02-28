import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import home from './view/home';


const Routes = () => {
  
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={home} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;