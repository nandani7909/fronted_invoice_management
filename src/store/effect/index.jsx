import { all, fork } from 'redux-saga/effects';
import invoicesSaga from '../../pages/invoices-listing/invoicesSaga';

/**
 * @author      Nandani.V.Patel
 * @date        26th Dec 2024
 * @description rootSaga function which contains all react-application saga.
 * @param       
 * @response      
**/

export function* rootSaga() {
  yield all([
    fork(invoicesSaga)
  ]);
}