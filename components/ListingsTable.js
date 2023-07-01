import Link from "next/link";
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import { fontWeight } from "@mui/system";

const ListingsTable = (props) => {

  // instantiate table component object and error variable
  const [listings, setListings] = useState(props.listings);
  const [nonExisting, setNonExisting] = useState(props.nonExisting);
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
    // {
    //   field: 'url',
    //   headerName: 'URL',
    //   flex: 3,
    //   align: 'center',
    //   headerAlign: 'center',
    //   renderCell: (params) => (
    //     <div className="container text-center text-truncate">
    //       <Link href={`${params.row.url}`} target="_blank">{params.row.url}</Link>
    //     </div>

    //   )
    // },
    {
      field: 'page',
      headerName: 'URL',
      flex: 3,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="container text-center text-truncate">
          <Link href={`${params.row.page}`} target="_blank">{params.row.page}</Link>
        </div>

      )
    },

  ];

  console.log('nonExisting is: ', nonExisting);

  return (
    <div className='w-100'>
      {/* show error if there's a delete item issue */}
      {tableError && <div className='bg-danger text-light mb-3 p-3'>This is a tableError: {tableError}</div>}

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
      {/* {!nonExisting && <div>...loading</div>} */}
      {nonExisting && <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
            display: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            textDecoration: "underline",
          }

        }}
        rows={nonExisting}
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