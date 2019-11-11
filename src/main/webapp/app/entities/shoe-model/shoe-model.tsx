import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './shoe-model.reducer';
import { IShoeModel } from 'app/shared/model/shoe-model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShoeModelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ShoeModel extends React.Component<IShoeModelProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { shoeModelList, match } = this.props;
    return (
      <div>
        <h2 id="shoe-model-heading">
          <Translate contentKey="shoeshopApp.shoeModel.home.title">Shoe Models</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="shoeshopApp.shoeModel.home.createLabel">Create a new Shoe Model</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {shoeModelList && shoeModelList.length > 0 ? (
            <Table responsive aria-describedby="shoe-model-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="shoeshopApp.shoeModel.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="shoeshopApp.shoeModel.brand">Brand</Translate>
                  </th>
                  <th>
                    <Translate contentKey="shoeshopApp.shoeModel.price">Price</Translate>
                  </th>
                  <th>
                    <Translate contentKey="shoeshopApp.shoeModel.shop">Shop</Translate>
                  </th>
                  <th>
                    <Translate contentKey="shoeshopApp.shoeModel.shop">Shop</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {shoeModelList.map((shoeModel, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${shoeModel.id}`} color="link" size="sm">
                        {shoeModel.id}
                      </Button>
                    </td>
                    <td>{shoeModel.name}</td>
                    <td>{shoeModel.brand}</td>
                    <td>{shoeModel.price}</td>
                    <td>{shoeModel.shop ? <Link to={`shop/${shoeModel.shop.id}`}>{shoeModel.shop.id}</Link> : ''}</td>
                    <td>{shoeModel.shop ? <Link to={`shop/${shoeModel.shop.id}`}>{shoeModel.shop.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${shoeModel.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${shoeModel.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${shoeModel.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="shoeshopApp.shoeModel.home.notFound">No Shoe Models found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ shoeModel }: IRootState) => ({
  shoeModelList: shoeModel.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoeModel);
