import Link from "next/link";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport, MaterialTable } from '@mui/x-data-grid';
import { useEffect, useState } from "react";

const XLSX = require('xlsx');

const SearchResultsTable = (props) => {

    // instantiate table component object and error variable
    const [listings, setListings] = useState(props.listings);
    const [tableError, setTableError] = useState(null);

    if(listings.length == 0) {
        return (
            <div> No listings </div>
        );
    }

    let modifiedListings = [];

    modifiedListings = listings.map((item, index) => {
        return { id: index + 1, ...item };
    });

    // table headers
    let listingsKeys = [];
    if (modifiedListings) {
        listingsKeys = Object.keys(modifiedListings[0]);
    }

    // columns to exclude
    const columnsToExclude = ['industry', 'city', 'state', 'createdAt', 'updatedAt', '__v', 'phone']

    // define Material UI table columns
    const columns = [];

    listingsKeys.map((key, i) => {
        if (!columnsToExclude.includes(key)) {
            const tempObj = {
                field: key,
                headerName: key,
                flex: 0.5,
                headerAlign: 'center'
            };
            columns.push(tempObj);
        }
    });

    // set width for certain cells
    const modifyCellWidth1 = ['id'];
    const modifyCellWidth2 = ['rating', 'reviews'];
    columns.map((ele, i) => {
        if (modifyCellWidth1.includes(ele.field)) {
            ele['flex'] = 0.1;
        }
        else if(modifyCellWidth2.includes(ele.field)) {
            ele['flex'] = 0.2;
        }
    });

    // handle excel export
    const downloadExcel = () => {

        const sheetName = "Sheet1";

        const headers = columns.map(column => {
            return column.headerName;
        });

        const fields = columns.map(column => {
            return column.field;
        });

        console.log('fields: ', fields);

        // const data = products;
        const data = modifiedListings;
        const rows = [];

        console.log('headers: ', headers);

        for (const row of data) {

            let rowValues = [];
            fields.forEach(x => {
                rowValues.push(row[x]);
            })
            rows.push(rowValues);

        }

        console.log('rows: ', rows);

        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

        // Set the column width for the first column to 20 and the second column to 30
        worksheet['!cols'] = [
            { width: 20 },
            { width: 40 },
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, "listings.xlsx");


    }

    console.log('modifiedListings: ', modifiedListings);
    console.log('columns: ', columns);
    console.log('listingsKeys: ', listingsKeys);

    return (
        <div className='w-100'>
            {/* show error if there's a delete item issue */}
            {tableError && <div className='bg-danger text-light mb-3 p-3'>This is a tableError: {tableError}</div>}

            {modifiedListings && <DataGrid
                sx={{
                    "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
                        display: "none"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        textDecoration: "underline",
                    }

                }}
                rows={modifiedListings}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                autoHeight
                sortable
                getRowId={(row) => row.id}
                components={{

                    Toolbar: () => {
                        return (
                            <>
                                <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
                                    <button className='px-3 py-1 ms-3 me-4 mt-3 bg-primary text-white border-0 rounded-3' onClick={downloadExcel}>
                                        Export to xlsx
                                    </button>
                                </GridToolbarContainer>

                            </>

                        );

                    },
                }}
            />}
        </div>
    );
}

export default SearchResultsTable;