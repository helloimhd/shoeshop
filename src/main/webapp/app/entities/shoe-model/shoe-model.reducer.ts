import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IShoeModel, defaultValue } from 'app/shared/model/shoe-model.model';

export const ACTION_TYPES = {
  FETCH_SHOEMODEL_LIST: 'shoeModel/FETCH_SHOEMODEL_LIST',
  FETCH_SHOEMODEL: 'shoeModel/FETCH_SHOEMODEL',
  CREATE_SHOEMODEL: 'shoeModel/CREATE_SHOEMODEL',
  UPDATE_SHOEMODEL: 'shoeModel/UPDATE_SHOEMODEL',
  DELETE_SHOEMODEL: 'shoeModel/DELETE_SHOEMODEL',
  RESET: 'shoeModel/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IShoeModel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ShoeModelState = Readonly<typeof initialState>;

// Reducer

export default (state: ShoeModelState = initialState, action): ShoeModelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SHOEMODEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SHOEMODEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SHOEMODEL):
    case REQUEST(ACTION_TYPES.UPDATE_SHOEMODEL):
    case REQUEST(ACTION_TYPES.DELETE_SHOEMODEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SHOEMODEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SHOEMODEL):
    case FAILURE(ACTION_TYPES.CREATE_SHOEMODEL):
    case FAILURE(ACTION_TYPES.UPDATE_SHOEMODEL):
    case FAILURE(ACTION_TYPES.DELETE_SHOEMODEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHOEMODEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHOEMODEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SHOEMODEL):
    case SUCCESS(ACTION_TYPES.UPDATE_SHOEMODEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SHOEMODEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/shoe-models';

// Actions

export const getEntities: ICrudGetAllAction<IShoeModel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SHOEMODEL_LIST,
  payload: axios.get<IShoeModel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IShoeModel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SHOEMODEL,
    payload: axios.get<IShoeModel>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IShoeModel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SHOEMODEL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IShoeModel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SHOEMODEL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IShoeModel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SHOEMODEL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
