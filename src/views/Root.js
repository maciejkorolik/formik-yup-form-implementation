import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../routes';
import MainTemplate from '../templates/MainTemplate';
import Form from './Form';
import Success from './Success';

const Root = () => (
  <BrowserRouter>
    <MainTemplate>
      <Switch>
        <Route exact path={routes.home} render={() => <Redirect to={routes.form} />} />
        <Route exact path={routes.form} component={Form} />
        <Route exact path={routes.success} component={Success} />
      </Switch>
    </MainTemplate>
  </BrowserRouter>
);

export default Root;
