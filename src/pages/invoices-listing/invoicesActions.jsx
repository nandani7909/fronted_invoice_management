/**
 * @author      Nandani.V.Patel
 * @date        26th Dec 2024
 * @description ActionTypes and ActionCreator Function for Invoices Request.
 * @param
 * @response
 **/

export const ActionTypes = {
  GET_INVOICES_REQUEST: "GET_INVOICES_REQUEST",
  GET_INVOICES_SUCCESS: "GET_INVOICES_SUCCESS",
  GET_INVOICES_FAILURE: "GET_INVOICES_FAILURE",

  GET_INVOICE_DETAILS_REQUEST: "GET_INVOICE_DETAILS_REQUEST",
  GET_INVOICE_DETAILS_SUCCESS: "GET_INVOICE_DETAILS_SUCCESS",
  GET_INVOICE_DETAILS_FAILURE: "GET_INVOICE_DETAILS_FAILURE",

  ADD_INVOICES_REQUEST: "ADD_INVOICES_REQUEST",
  ADD_INVOICES_SUCCESS: "ADD_INVOICES_SUCCESS",
  ADD_INVOICES_FAILURE: "ADD_INVOICES_FAILURE",

  DELETE_INVOICES_REQUEST: "DELETE_INVOICES_REQUEST",
  DELETE_INVOICES_SUCCESS: "DELETE_INVOICES_SUCCESS",
  DELETE_INVOICES_FAILURE: "DELETE_INVOICES_FAILURE",

  GET_CUSTOMERS_REQUEST: "GET_CUSTOMERS_REQUEST",
  GET_CUSTOMERS_SUCCESS: "GET_CUSTOMERS_SUCCESS",
  GET_CUSTOMERS_FAILURE: "GET_CUSTOMERS_FAILURE",

  GET_PRODUCTS_REQUEST: "GET_PRODUCTS_REQUEST",
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_FAILURE: "GET_PRODUCTS_FAILURE",

  GET_BATCHES_FOR_PRODUCTS_REQUEST: "GET_BATCHES_FOR_PRODUCTS_REQUEST",
  GET_BATCHES_FOR_PRODUCTS_SUCCESS: "GET_BATCHES_FOR_PRODUCTS_SUCCESS",
  GET_BATCHES_FOR_PRODUCTS_FAILURE: "GET_BATCHES_FOR_PRODUCTS_FAILURE",
};

export const getInvoicesRequest = (paginationdata) => {
  return {
    type: ActionTypes.GET_INVOICES_REQUEST,
    payload: paginationdata,
  };
};

export const getInvoiceDetailsRequest = (id) => {
  return {
    type: ActionTypes.GET_INVOICE_DETAILS_REQUEST,
    payload: id,
  };
};

export const addInvoicesRequest = (data) => {
  return {
    type: ActionTypes.ADD_INVOICES_REQUEST,
    payload: data,
  };
};

export const deleteInvoicesRequest = (invoiceID) => {
  return {
    type: ActionTypes.DELETE_INVOICES_REQUEST,
    payload: invoiceID,
  };
};

export const getCustomersRequest = () => {
  return {
    type: ActionTypes.GET_CUSTOMERS_REQUEST,
  };
};

export const getProductsRequest = () => {
  return {
    type: ActionTypes.GET_PRODUCTS_REQUEST,
  };
};

export const getBatchesForProduct = (productId) => {
  return {
    type: ActionTypes.GET_BATCHES_FOR_PRODUCTS_REQUEST,
    payload: productId,
  };
};
