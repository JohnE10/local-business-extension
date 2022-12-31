import Link from "next/link";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import { fontWeight } from "@mui/system";

const ListingsTable = (props) => {

  // instantiate table component object and error variable
  const [listings, setListings] = useState(props.listings);
  const [tableError, setTableError] = useState(null);

  // define Material UI table columns
  const columns = [
    {
      field: 'id',
      headerName: 'No.',
      flex: 0.5,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'name',
      headerName: 'Business Name',
      flex: 3,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'url',
      headerName: 'URL',
      flex: 3,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="container text-center text-truncate">
        <Link href={`${params.row.url}`} target="_blank">{params.row.url}</Link>
        </div>

      )
      
    },

  ];

  return (
    <div>
      {/* show error if there's a delete item issue */}
      {tableError && <div className='bg-danger text-light mb-3 p-3'>{ tableError }</div>}

      {/* show list of items in store */}
      {listings && <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
            display: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            textDecoration: "underline",
          }

        }}
        rows={listings}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        autoHeight
        sortable
      />}
    </div>
  );
}

export default ListingsTable;