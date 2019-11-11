import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ShoeModel from './shoe-model';
import ShoeModelDetail from './shoe-model-detail';
import ShoeModelUpdate from './shoe-model-update';
import ShoeModelDeleteDialog from './shoe-model-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ShoeModelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ShoeModelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ShoeModelDetail} />
      <ErrorBoundaryRoute path={match.url} component={ShoeModel} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ShoeModelDeleteDialog} />
  </>
);

export default Routes;
