import React from "react";
import DataTable from "react-data-table-component";

const Table = ({
  columns,
  data,
  pagination = true,
  paginationServer = false,
  paginationTotalRows = 0,
  paginationPerPage,
  onChangePage,
  onChangeRowsPerPage,
  progressPending,
  customStyles = {},
  fixedHeader = true,
  rowsPerPageOptions = [5, 10, 15, 25],
  theme = "solarized",
  responsive = true,
}) => {

  const tableStyle = {
    headRow: {
      style: {
        backgroundColor: "rgb(245, 246, 248)",
      },
    },
    rows: {
      style: {
        border: "1px dotted #ccc",
        padding: "15px 15px",
      },
    },
    ...customStyles,
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      theme={theme}
      fixedHeader={fixedHeader}
      pagination={pagination}
      paginationServer={paginationServer}
      paginationTotalRows={paginationTotalRows}
      paginationPerPage={paginationPerPage}
      paginationRowsPerPageOptions={rowsPerPageOptions}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      responsive={responsive}
      customStyles={tableStyle}
      progressPending={progressPending}
    />
  );
};

export default Table;
