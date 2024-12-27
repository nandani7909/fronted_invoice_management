import React from "react";

const Modal = ({ show, onClose, onConfirm }) => {
  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
      id="myModal"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Invoice</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this invoice?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
