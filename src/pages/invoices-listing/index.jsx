import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import Table from "../../components/dataTable";
import * as InvoicesActions from "./invoicesActions";
import Modal from "../../components/modal";
import { EDIT_INVOICE } from "../../global/routes";
import debounce from "lodash/debounce";

const InvoicesListing = (props) => {
  const { invoices, actions } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstInit, setFirstInit] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [invoiceData, setInvoiceData] = useState([]);
  const [pending, setPending] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = debounce((searchQuery) => {
    setPage(1);
    actions.getInvoicesRequest({
      page: 1,
      limit: perPage,
      search: searchQuery,
    });
  }, 500);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (firstInit) {
      setPending(true);
      actions.getInvoicesRequest({ page, limit: perPage, search });
      setFirstInit(false);
    }
  }, [firstInit, page, perPage, search]);

  useEffect(() => {
    setFirstInit(true);
  }, [page, perPage]);

  useEffect(() => {
    if (invoices?.data !== undefined && !invoices?.isInvoices) {
      setInvoiceData(invoices?.data?.data);
      setPending(false);
    }
  }, [invoices?.data, invoices?.isInvoices]);

  useEffect(() => {
    if (
      invoices?.deleteddata !== undefined &&
      !invoices?.isdelete &&
      invoices?.deleteddata?.status === "success"
    ) {
      actions.getInvoicesRequest({ page, limit: perPage });
    }
    dispatch({
      type: InvoicesActions.ActionTypes.DELETE_INVOICES_SUCCESS,
      deleteddata: undefined,
    });
  }, [invoices?.deleteddata, invoices?.isdelete, page, perPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    actions.deleteInvoicesRequest({ id: deleteId });
    setShowModal(false);
  };

  const columns = [
    {
      name: "Invoice Number",
      selector: (row) => row.invoiceNumber || "-",
      sortable: true,
    },
    {
      name: "Invoice Type",
      selector: (row) => row.invoiceType || "-",
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString() || "-",
    },
    {
      name: "Products",
      cell: (row) => (
        <div>
          {row?.products?.map((product, index) => (
            <div key={index}>
              <p>
                <strong>Batch: </strong>
                {product?.batch ? product.batch : "-"}{" "}
              </p>
              <p>
                <strong>Quantity: </strong>
                {product?.quantity ? product.quantity : "-"}{" "}
              </p>
              <p>
                <strong>Discount: </strong>
                {product?.discount ? product.discount : "-"}%{" "}
              </p>
              <p>
                <strong>Tax: </strong>
                {product?.tax ? product.tax : "-"}%{" "}
              </p>
              <p>
                <strong>Total: </strong>$
                {product?.grandTotal ? product.grandTotal : "0"}{" "}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Total Invoice Amount",
      selector: (row) =>
        row.products?.reduce(
          (total, product) => total + product?.grandTotal,
          0
        ) || 0,
      sortable: true,
    },
    {
      name: "Actions",
      alignItem: "center",
      cell: (row) => (
        <div>
          <button
            onClick={() => navigate(`${EDIT_INVOICE}/${row._id}`)}
            className="btn btn-warning"
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#myModal"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="col-md-4 mb-3">
        <input
          type="text"
          placeholder="Search invoices"
          value={search}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>

      <Table
        columns={columns}
        data={invoiceData}
        pagination
        paginationServer
        paginationTotalRows={invoices?.data?.pagination?.totalInvoices}
        paginationPerPage={perPage}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerPageChange}
        progressPending={pending}
      />
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  invoices: state.invoices,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(InvoicesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesListing);
