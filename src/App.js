import { Fragment } from "react";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  DASHBOARD,
  INVOICES,
  ADD_INVOICE,
  EDIT_INVOICE,
  ID,
  NOTFOUND,
} from "./global/routes";
import LayoutWrapper from "./layouts/layoutWrapper";

import Dashboard from "./pages/dashbaord";
import NotFound from "./pages/notFound";
import Invoices from "./pages/invoices";
import InvoicesListing from "./pages/invoices-listing";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path={DASHBOARD} element={<Dashboard />} />
              <Route path={INVOICES} element={<InvoicesListing />} />
              <Route path={ADD_INVOICE} element={<Invoices />} />
              <Route path={`${EDIT_INVOICE}${ID}`} element={<Invoices />} />
              <Route path={NOTFOUND} element={<NotFound />} />
              <Route path="*" element={<Navigate to={NOTFOUND} replace />} />
            </Routes>
          </LayoutWrapper>
        </Provider>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
