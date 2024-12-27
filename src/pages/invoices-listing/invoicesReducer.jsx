import { ActionTypes } from "./invoicesActions";

/**
 * @author      Nandani.V.Patel
 * @date        26th Dec 2024
 * @description Invoice Reducer.
 * @param       takes default and previous state value
 * @response    update a state value and store Invoice api response
 **/

const defaultState = {
  isInvoices: false,
  data: undefined,
  isdeatils: false,
  details: undefined,
  isadd: false,
  adddata: undefined,
  isdelete: false,
  deletedata: undefined,
  isCustomers: false,
  customers: undefined,
  isProducts: false,
  products: undefined,
  isBatchesProduct: false,
  batchesProduct: undefined,
};

const invoicesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.GET_INVOICES_REQUEST:
      return {
        ...state,
        isInvoices: true,
      };
    case ActionTypes.GET_INVOICES_SUCCESS:
      return {
        ...state,
        data: action.data,
        isInvoices: false,
      };
    case ActionTypes.GET_INVOICES_FAILURE:
      return {
        ...state,
        isInvoices: false,
        error: action.error,
      };
    case ActionTypes.GET_INVOICE_DETAILS_REQUEST:
      return {
        ...state,
        isdeatils: true,
      };
    case ActionTypes.GET_INVOICE_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.data,
        isdeatils: false,
      };
    case ActionTypes.GET_INVOICE_DETAILS_FAILURE:
      return {
        ...state,
        isdeatils: false,
        error: action.error,
      };
    case ActionTypes.ADD_INVOICES_REQUEST:
      return {
        ...state,
        isadd: true,
      };
    case ActionTypes.ADD_INVOICES_SUCCESS:
      return {
        ...state,
        adddata: action.data,
        isadd: false,
      };
    case ActionTypes.ADD_INVOICES_FAILURE:
      return {
        ...state,
        isadd: false,
        error: action.error,
      };
    case ActionTypes.DELETE_INVOICES_REQUEST:
      return {
        ...state,
        isdelete: true,
      };
    case ActionTypes.DELETE_INVOICES_SUCCESS:
      return {
        ...state,
        deleteddata: action.data,
        isdelete: false,
      };
    case ActionTypes.DELETE_INVOICES_FAILURE:
      return {
        ...state,
        isdelete: false,
        error: action.error,
      };
    case ActionTypes.GET_CUSTOMERS_REQUEST:
      return {
        ...state,
        isCustomers: true,
      };
    case ActionTypes.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.data,
        isCustomers: false,
      };
    case ActionTypes.GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        isCustomers: false,
        error: action.error,
      };
    case ActionTypes.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isProducts: true,
      };
    case ActionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.data,
        isProducts: false,
      };
    case ActionTypes.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isProducts: false,
        error: action.error,
      };
    case ActionTypes.GET_BATCHES_FOR_PRODUCTS_REQUEST:
      return {
        ...state,
        isBatchesProduct: true,
      };
    case ActionTypes.GET_BATCHES_FOR_PRODUCTS_SUCCESS:
      return {
        ...state,
        batchesProduct: action.data,
        isBatchesProduct: false,
      };
    case ActionTypes.GET_BATCHES_FOR_PRODUCTS_FAILURE:
      return {
        ...state,
        isBatchesProduct: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default invoicesReducer;
