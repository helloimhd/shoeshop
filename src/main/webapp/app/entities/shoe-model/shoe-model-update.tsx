import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IShop } from 'app/shared/model/shop.model';
import { getEntities as getShops } from 'app/entities/shop/shop.reducer';
import { getEntity, updateEntity, createEntity, reset } from './shoe-model.reducer';
import { IShoeModel } from 'app/shared/model/shoe-model.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IShoeModelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IShoeModelUpdateState {
  isNew: boolean;
  shopId: string;
  shopId: string;
}

export class ShoeModelUpdate extends React.Component<IShoeModelUpdateProps, IShoeModelUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      shopId: '0',
      shopId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getShops();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { shoeModelEntity } = this.props;
      const entity = {
        ...shoeModelEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/shoe-model');
  };

  render() {
    const { shoeModelEntity, shops, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="shoeshopApp.shoeModel.home.createOrEditLabel">
              <Translate contentKey="shoeshopApp.shoeModel.home.createOrEditLabel">Create or edit a ShoeModel</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : shoeModelEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="shoe-model-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="shoe-model-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="shoe-model-name">
                    <Translate contentKey="shoeshopApp.shoeModel.name">Name</Translate>
                  </Label>
                  <AvField id="shoe-model-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="brandLabel" for="shoe-model-brand">
                    <Translate contentKey="shoeshopApp.shoeModel.brand">Brand</Translate>
                  </Label>
                  <AvField id="shoe-model-brand" type="text" name="brand" />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="shoe-model-price">
                    <Translate contentKey="shoeshopApp.shoeModel.price">Price</Translate>
                  </Label>
                  <AvField id="shoe-model-price" type="string" className="form-control" name="price" />
                </AvGroup>
                <AvGroup>
                  <Label for="shoe-model-shop">
                    <Translate contentKey="shoeshopApp.shoeModel.shop">Shop</Translate>
                  </Label>
                  <AvInput id="shoe-model-shop" type="select" className="form-control" name="shop.id">
                    <option value="" key="0" />
                    {shops
                      ? shops.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="shoe-model-shop">
                    <Translate contentKey="shoeshopApp.shoeModel.shop">Shop</Translate>
                  </Label>
                  <AvInput id="shoe-model-shop" type="select" className="form-control" name="shop.id">
                    <option value="" key="0" />
                    {shops
                      ? shops.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/shoe-model" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  shops: storeState.shop.entities,
  shoeModelEntity: storeState.shoeModel.entity,
  loading: storeState.shoeModel.loading,
  updating: storeState.shoeModel.updating,
  updateSuccess: storeState.shoeModel.updateSuccess
});

const mapDispatchToProps = {
  getShops,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoeModelUpdate);
