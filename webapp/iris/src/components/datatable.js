import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import APIHelper from "../apis/APIHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let globalProps;

const notify = (message) => {
  toast.success(message, {
    toastId: "request-resolved",
  });
};

/**
 * Below constant will define the  column fields of the datatable
 */
const columns = [
  { field: "_id" },
  { field: "serial", headerName: "Request ID", width: 100 },
  { field: "location", headerName: "Location", width: 300 },
  {
    field: "emergencyLevel",
    headerName: "Emergency Level",
    width: 150,
  },
  {
    field: "status",
    headerName: "Request Status",
    width: 300,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        // Function to update the status of the request to resolved when clicked on Admit Patient
        const payload = {
          status: "Resolved",
        };

        if (thisRow.status !== "Resolved") {
          APIHelper.updateRequest(
            thisRow._id,
            payload,
            globalProps.currentUser.accessToken
          ).then(() => {
            notify("The request is resolved.");

            // reload table data to reflect status changes
            const reload = globalProps.reload;
            reload();
          });
        } else {
          notify("The request is already resolved.");
        }
      };

      return (
        <button className="history-action" type="button" onClick={onClick}>
          Admit
        </button>
      );
    },
  },
];

/**
 * Function to populate the rows in the datatable
 * @param {*} props
 * @returns
 */
export default function DataTable(props) {
  globalProps = props;
  props.data.forEach((row, index) => {
    row.serial = index + 1;
    row.location = row.caller?.callerAddress;
  });
  return (
    <div className="callHistory">
      <ToastContainer />
      <div>
        <h2>Emergency Requests</h2>
      </div>
      <div className="data-grid-container">
        <DataGrid
          initialState={
            props.currentUser.role === "Hospital"
              ? {
                  columns: {
                    columnVisibilityModel: {
                      // Hide columns _id, the other columns will remain visible
                      _id: false,
                    },
                  },
                }
              : {
                  columns: {
                    columnVisibilityModel: {
                      // Hide columns _id, the other columns will remain visible
                      _id: false,
                      action: false,
                    },
                  },
                }
          }
          rows={props.data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          rowSelection="single"
          onSelectionModelChange={(ids) => props.getSelectedRow(ids)}
        />
      </div>
    </div>
  );
}
