import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/GlobalStyle';
import { theme } from '../theme/mainTheme';
import { routes } from '../routes';
import Form from './Form';
import Success from './Success';
import 'typeface-roboto';

const Root = () => (
  <BrowserRouter>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path={routes.home} render={() => <Redirect to={routes.form} />} />
        <Route exact path={routes.form} component={Form} />
        <Route exact path={routes.success} component={Success} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>
);

export default Root;
