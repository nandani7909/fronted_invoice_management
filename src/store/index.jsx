import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../store/effect/index";
import { rootReducer } from "./reducer/index";

/**
 * @author      Nandani.V.Patel
 * @date        26th Dec 2024
 * @description global state of a application is store in an object
 * @param
 * @response
 **/

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
