import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as InvoicesActions from "../invoices-listing/invoicesActions";
import { useForm } from "react-hook-form";
import Dropdown from "../../components/dropDown";

const AddEditInvoice = ({ editingInvoice = null }) => {
  const invoices = useSelector((state) => state?.invoices);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [firstInit, setFirstInit] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [productData, setProductData] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const [newProduct, setNewProduct] = useState({
    productId: "",
    batch: "",
    quantity: 0,
    discount: 0,
    tax: 0,
    grandTotal: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm();

  const {
    register: productRegister,
    handleSubmit: handleProductSubmit,
    formState: { errors: productErrors },
    reset: resetProductForm,
    watch: productWatch,
    clearErrors,
  } = useForm({
    defaultValues: {
      productId: "",
      batch: "",
      quantity: 0,
      discount: 0,
      tax: 0,
    },
  });

  useEffect(() => {
    setIsEditMode(!!id);
  }, [id]);

  useEffect(() => {
    if (firstInit) {
      dispatch(InvoicesActions.getCustomersRequest());
      dispatch(InvoicesActions.getProductsRequest());
      setFirstInit(false);
    }
  }, [firstInit]);

  useEffect(() => {
    if (
      firstInit &&
      id !== undefined &&
      id !== null &&
      id !== "" &&
      isEditMode
    ) {
      dispatch(InvoicesActions.getInvoiceDetailsRequest({ id: id }));
      setFirstInit(false);
    }
  }, [firstInit, isEditMode]);

  useEffect(() => {
    setFirstInit(true);
  }, []);

  useEffect(() => {
    if (invoices?.customers?.data !== undefined && !invoices?.isCustomers) {
      setCustomers(invoices?.customers?.data);
    }
  }, [invoices?.customers, invoices?.isCustomers]);

  useEffect(() => {
    if (invoices?.products?.data !== undefined && !invoices?.isProducts) {
      setProductData(invoices?.products?.data);
    }
  }, [invoices?.products, invoices?.isProducts]);

  useEffect(() => {
    if (
      invoices?.batchesProduct?.data !== undefined &&
      !invoices?.isBatchesProduct
    ) {
      setBatchData(invoices?.batchesProduct?.data);
    }
  }, [invoices?.batchesProduct, invoices?.isBatchesProduct]);

  const selectedProductId = productWatch("productId");
  useEffect(() => {
    if (selectedProductId) {
      dispatch(InvoicesActions.getBatchesForProduct({ id: selectedProductId }));
    }
  }, [selectedProductId, dispatch]);

  useEffect(() => {
    if (!isEditMode) {
      reset({
        customerId: "",
        invoiceType: "",
        invoiceNumber: "",
        salesReturnNumber: "",
        date: "",
      });
    }
  }, [isEditMode, reset]);

  useEffect(() => {
    if (!isEditMode) {
      reset();
      setNewProduct({
        productId: "",
        batch: "",
        quantity: 0,
        discount: 0,
        tax: 0,
        grandTotal: 0,
      });
      setProducts([]);
    }
  }, [isEditMode, reset]);

  useEffect(() => {
    if (
      invoices?.details?.data !== undefined &&
      !invoices?.isdeatils &&
      isEditMode
    ) {
      const invoiceDetails = invoices?.details?.data;

      // Set form values
      setValue("customerId", invoiceDetails?.customerId?.name || "");
      setValue("invoiceType", invoiceDetails?.invoiceType);
      setValue("invoiceNumber", invoiceDetails?.invoiceNumber);
      setValue("salesReturnNumber", invoiceDetails?.salesReturnNumber);
      setValue("date", invoiceDetails?.date?.slice(0, 10));

      const productsList = invoiceDetails?.products || [];
      setProducts(productsList);

      if (
        isEditMode &&
        editingInvoice &&
        editingInvoice.products &&
        editingInvoice.products.length > 0
      ) {
        const product = editingInvoice.products[0];
        setNewProduct({
          productId: product.productId || "",
          batch: product.batch || "",
          quantity: product.quantity || 0,
          discount: product.discount || 0,
          tax: product.tax || 0,
          grandTotal: product.grandTotal || 0,
        });
        setProducts(editingInvoice.products);
      }
    }
    dispatch({
      type: InvoicesActions.ActionTypes.GET_INVOICE_DETAILS_SUCCESS,
      details: undefined,
    });
  }, [
    invoices?.details,
    invoices?.isdeatils,
    setValue,
    editingInvoice,
    isEditMode,
  ]);

  // Calculate Grand Total for Product
  const calculateGrandTotal = () => {
    const { quantity, discount, tax } = newProduct;
    const basePrice = quantity * 100; // Assuming the base price is 100 per quantity
    const discountAmount = (basePrice * discount) / 100;
    const taxAmount = (basePrice - discountAmount) * (tax / 100);
    const total = basePrice - discountAmount + taxAmount;
    setNewProduct((prev) => ({ ...prev, grandTotal: total }));
  };

  // Save Product Handler
  const saveProduct = (data) => {
    setProducts((prev) => [
      ...prev,
      { ...data, grandTotal: newProduct.grandTotal },
    ]);
    setNewProduct({
      productId: "",
      batch: "",
      quantity: 0,
      discount: 0,
      tax: 0,
      grandTotal: 0,
    });
    resetProductForm();
  };

  const onSubmit = (data) => {
    if (
      Object.keys(errors).length > 0 ||
      Object.keys(productErrors).length > 0
    ) {
      return;
    }
    const invoiceData = { ...data, products };
    dispatch(InvoicesActions.addInvoicesRequest(invoiceData));
  };

  // Update Invoice Number when Customer is selected
  const handleCustomerChange = (customerId) => {};

  useEffect(() => {
    if (editingInvoice && editingInvoice.productId) {
      setNewProduct((prev) => ({
        ...prev,
        productId: editingInvoice.productId,
      }));
    }
  }, [editingInvoice]);

  const handleProductChange = (field, value) => {
    setNewProduct((prev) => {
      const updatedProduct = { ...prev, [field]: value };
      calculateGrandTotal();
      if (field === "batch" || field === "quantity") {
        clearErrors(field);
      }
      return updatedProduct;
    });
  };

  return (
    <div>
      <h3 className="mb-4">{isEditMode ? "Update Invoice" : "Add Invoice"}</h3>
      {/* General Information Section */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5>General Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {/* Customer Dropdown */}
            <div className="col-md-6 mb-3">
              <Dropdown
                label="Customer"
                name="customerId"
                options={customers}
                register={register}
                validation={{ required: "Customer is required" }}
                error={errors.customerId}
                onChange={(e) => handleCustomerChange(e.target.value)}
              />
            </div>
            {/* Invoice Type Dropdown */}
            <div className="col-md-6 mb-3">
              <label>Invoice Type</label>
              <select
                name="invoiceType"
                className="form-select"
                {...register("invoiceType", {
                  required: "Invoice Type is required",
                })}
              >
                <option value="">Select Invoice Type</option>
                <option value="sale">Sale</option>
                <option value="return">Return</option>
              </select>
              {errors.invoiceType && (
                <div className="text-danger">{errors.invoiceType.message}</div>
              )}
            </div>
          </div>
          <div className="row">
            {/* Invoice Number (Read-only) */}
            <div className="col-md-6 mb-3">
              <label>Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                className="form-control"
                value={getValues("invoiceNumber")}
                readOnly
              />
            </div>
            {/* Date Picker (Required Validation Added) */}
            <div className="col-md-6 mb-3">
              <label>Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <div className="text-danger">{errors.date.message}</div>
              )}
            </div>
          </div>
          <div className="row">
            {/* Sales Return Number Input */}
            <div className="col-md-6 mb-3">
              <label>Sales Return Number</label>
              <input
                type="text"
                name="salesReturnNumber"
                className="form-control"
                {...register("salesReturnNumber")}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Product Details Section */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5>Product Details</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleProductSubmit(saveProduct)}>
            <div className="row">
              {/* Product Dropdown */}
              <div className="col-md-4 mb-3">
                <Dropdown
                  label="Product"
                  name="productId"
                  options={productData}
                  register={productRegister}
                  validation={{ required: "Product is required" }}
                  error={productErrors.productId}
                  onChange={(e) =>
                    handleProductChange("productId", e.target.value)
                  }
                  // value={newProduct.productId || ""}
                />
              </div>
              {/* Batch Dropdown */}
              <div className="col-md-4 mb-3">
                <Dropdown
                  label="Batch"
                  name="batch"
                  options={batchData}
                  register={productRegister}
                  validation={{ required: "Batch is required" }}
                  error={productErrors.batch}
                  onChange={(e) => handleProductChange("batch", e.target.value)}
                  // value={newProduct.batch || ""}
                />
              </div>
              {/* Quantity Input */}
              <div className="col-md-4 mb-3">
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={newProduct.quantity}
                  {...productRegister("quantity")}
                  onChange={(e) => {
                    const value = Math.max(0, e.target.value);
                    handleProductChange("quantity", value);
                  }}
                />
                {productErrors.quantity && (
                  <div className="text-danger">
                    {productErrors.quantity.message}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              {/* Discount Input */}
              <div className="col-md-4 mb-3">
                <label>Discount (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={newProduct.discount}
                  min="0"
                  {...productRegister("discount")}
                  onChange={(e) => {
                    const value = Math.max(0, e.target.value);
                    handleProductChange("discount", value);
                  }}
                />
              </div>
              {/* Tax Input */}
              <div className="col-md-4 mb-3">
                <label>Tax (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={newProduct.tax}
                  min="0"
                  {...productRegister("tax")}
                  onChange={(e) => {
                    const value = Math.max(0, e.target.value);
                    handleProductChange("tax", value);
                  }}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Grand Total</label>
                <input
                  type="number"
                  className="form-control"
                  value={newProduct.grandTotal}
                  readOnly
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isEditMode}
            >
              Save Product
            </button>
          </form>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5>Product List</h5>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Batch</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>Tax</th>
                <th>Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {isEditMode
                        ? product.productId.name || "N/A"
                        : product.productId._id || "N/A"}
                    </td>
                    <td>{product.batch || "N/A"}</td>
                    <td>{product.quantity || 0}</td>
                    <td>{product.discount || 0}</td>
                    <td>{product.tax || 0}</td>
                    <td>
                      {product.grandTotal
                        ? `$${product.grandTotal.toFixed(2)}`
                        : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary mb-4" onClick={handleSubmit(onSubmit)}  disabled={isEditMode}>
        {isEditMode ? "Update Invoice" : "Submit Invoice"}
      </button>
    </div>
  );
};

export default AddEditInvoice;
