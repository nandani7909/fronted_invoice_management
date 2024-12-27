import { put, takeLatest, fork, call } from "redux-saga/effects";
import { ActionTypes } from "./invoicesActions";
import {
  postRequestAPI,
  getRequestAPI,
  deleteRequestAPI,
} from "../../global/api";

/**
 * @author      Nandani.V.Patel
 * @date        26th Dec 2024
 * @description Invoices Saga and handling API response.
 * @param       InvdeleteInvoicesSagaoices Request payload
 * @response    Invoices Req is success or fail.
 **/

function* getInvoicesSaga(action) {
  try {
    const { page, limit, search } = action.payload;
    const response = yield call(getRequestAPI, {
      url: "invoices",
      params: { page, limit, search },
    });
    if (response?.data?.status === "success") {
      yield put({
        type: ActionTypes.GET_INVOICES_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_INVOICES_FAILURE,
        error: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: ActionTypes.GET_INVOICES_FAILURE,
      error: err?.response?.data,
    });
  }
}

function* getInvoiceDetailsSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(getRequestAPI, {
      url: `invoices/${id}`,
    });
    if (response?.data?.status === "success") {
      yield put({
        type: ActionTypes.GET_INVOICE_DETAILS_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_INVOICE_DETAILS_FAILURE,
        error: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: ActionTypes.GET_INVOICE_DETAILS_FAILURE,
      error: err?.response?.data,
    });
  }
}

function* addInvoicesSaga(action) {
  try {
    const response = yield call(postRequestAPI, {
      url: "invoices",
      data: action.payload,
    });
    if (response?.data?.status === "success") {
      yield put({
        type: ActionTypes.ADD_INVOICES_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: ActionTypes.ADD_INVOICES_FAILURE,
        error: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: ActionTypes.ADD_INVOICES_FAILURE,
      error: err?.response?.data,
    });
  }
}

function* deleteInvoicesSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(deleteRequestAPI, {
      url: `invoices/${id}`,
    });
    if (response?.data?.status === "success") {
      yield put({
        type: ActionTypes.DELETE_INVOICES_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: ActionTypes.DELETE_INVOICES_FAILURE,
        error: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: ActionTypes.DELETE_INVOICES_FAILURE,
      error: err?.response?.data,
    });
  }
}

function* getCustomersSaga() {
  try {
    const response = yield call(getRequestAPI, {
      url: "customers",
    });
    if (response?.data?.success === true) {
      yield put({
        type: ActionTypes.GET_CUSTOMERS_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_CUSTOMERS_FAILURE,
        error: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: ActionTypes.GET_CUSTOMERS_FAILURE,
      error: err?.response?.data,
    });
  }
}

function* getProductsSaga() {
  try {
    const response = yield call(getRequestAPI, {
      url: "products",
    });
    if (response?.data?.success === true) {
      yield put({
        type: ActionTypes.GET_PRODUCTS_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_PRODUCTS_FAILURE,
        error: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: ActionTypes.GET_PRODUCTS_FAILURE,
      error: err?.response?.data,
    });
  }
}

function* getBatchesForProductSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(getRequestAPI, {
      url: `product/${id}`,
    });
    if (response?.data?.success === true) {
      yield put({
        type: ActionTypes.GET_BATCHES_FOR_PRODUCTS_SUCCESS,
        data: response.data,
      });
    } else {
      yield put({
        type: ActionTypes.GET_BATCHES_FOR_PRODUCTS_FAILURE,
        error: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: ActionTypes.GET_BATCHES_FOR_PRODUCTS_FAILURE,
      error: err?.response?.data,
    });
  }
}

function* watchInvoicesRequest() {
  yield takeLatest(ActionTypes.GET_INVOICES_REQUEST, getInvoicesSaga);
  yield takeLatest(
    ActionTypes.GET_INVOICE_DETAILS_REQUEST,
    getInvoiceDetailsSaga
  );
  yield takeLatest(ActionTypes.ADD_INVOICES_REQUEST, addInvoicesSaga);
  yield takeLatest(ActionTypes.DELETE_INVOICES_REQUEST, deleteInvoicesSaga);
  yield takeLatest(ActionTypes.GET_CUSTOMERS_REQUEST, getCustomersSaga);
  yield takeLatest(ActionTypes.GET_PRODUCTS_REQUEST, getProductsSaga);
  yield takeLatest(
    ActionTypes.GET_BATCHES_FOR_PRODUCTS_REQUEST,
    getBatchesForProductSaga
  );
}

function* invoicesSaga() {
  yield fork(watchInvoicesRequest);
}

export default invoicesSaga;
