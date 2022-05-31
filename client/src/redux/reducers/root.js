import { combineReducers } from 'redux';
import { analysisReducer } from './analysisReducer';
import { loaderReducer } from './loaderReducer';

export const rootReducer = combineReducers({
  analysis: analysisReducer,
  loader: loaderReducer
});
