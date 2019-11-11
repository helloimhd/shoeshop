import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './shoe-model.reducer';
import { IShoeModel } from 'app/shared/model/shoe-model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IShoeModelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ShoeModelDetail extends React.Component<IShoeModelDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { shoeModelEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="shoeshopApp.shoeModel.detail.title">ShoeModel</Translate> [<b>{shoeModelEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="shoeshopApp.shoeModel.name">Name</Translate>
              </span>
            </dt>
            <dd>{shoeModelEntity.name}</dd>
            <dt>
              <span id="brand">
                <Translate contentKey="shoeshopApp.shoeModel.brand">Brand</Translate>
              </span>
            </dt>
            <dd>{shoeModelEntity.brand}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="shoeshopApp.shoeModel.price">Price</Translate>
              </span>
            </dt>
            <dd>{shoeModelEntity.price}</dd>
            <dt>
              <Translate contentKey="shoeshopApp.shoeModel.shop">Shop</Translate>
            </dt>
            <dd>{shoeModelEntity.shop ? shoeModelEntity.shop.id : ''}</dd>
            <dt>
              <Translate contentKey="shoeshopApp.shoeModel.shop">Shop</Translate>
            </dt>
            <dd>{shoeModelEntity.shop ? shoeModelEntity.shop.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/shoe-model" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/shoe-model/${shoeModelEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ shoeModel }: IRootState) => ({
  shoeModelEntity: shoeModel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoeModelDetail);
