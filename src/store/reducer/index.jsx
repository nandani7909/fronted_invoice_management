import { combineReducers } from 'redux'
import invoicesReducer from '../../pages/invoices-listing/invoicesReducer';

/**
 * @author      Nandani.V.Patel
 * @date        26th Dec 2024
 * @description rootReducer which combaines all react-application Reducer.
 * @param       
 * @response      
**/

export const rootReducer = combineReducers({
  invoices: invoicesReducer,
})