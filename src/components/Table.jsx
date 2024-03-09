import { useState, useEffect } from "react";
import { StripedDataGrid, DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./Table.css";

const API_URL = "http://localhost:8080/student";

function Table() {
    const [counter, setCounter] = useState(0);
    const [students, setStudents] = useState([]);

    const fetchData = async () => {
        const response = await fetch(`${API_URL}`); // returns Promise
        const data = await response.json(); // returns Promise

        console.log(data);
        setStudents(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const handleClickPlus = () => {
    //     setCounter(prv => prv + 1);
    // }

    // const handleClickMinus = () => {
    //     setCounter(prv => prv - 1);
    // }

    const columns = [
        {field: 'studentId', headerName: 'Student ID', width: 120, headerAlign: 'center', align: 'center', headerClassName: 'custom-header'},
        {field: 'name', headerName: 'Name', width: 180, headerAlign: 'center', align: 'center', headerClassName: 'custom-header'},
        {field: 'major', headerName: 'Major', width: 180, headerAlign: 'center', align: 'center', headerClassName: 'custom-header'},
        {field: 'year', headerName: 'Year', width: 80, headerAlign: 'center', align: 'center', headerClassName: 'custom-header'},
        {
          field: 'edit',
          headerName: '',
          width: 80,
          sortable: false,
          filterable: false,
          disableColumnMenu: true,
          headerClassName: 'custom-header',
          headerAlign: 'center', 
          align: 'center',
          renderCell: (params) =>
            // <EditCar cardata={params.row} />
            <IconButton aria-label="delete" size="small"
              onClick={() => {
                // if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
                //   mutate(params.row._links.car.href); // send http DELETE request
                // } 
              }}       
            >
                <EditIcon fontSize= "small" />
            </IconButton>
        },
        {
          field: 'delete',
          headerName: '',
          width: 80,
          sortable: false,
          filterable: false,
          disableColumnMenu: true,
          headerClassName: 'custom-header',
          headerAlign: 'center', 
          align: 'center',
          renderCell: (params) => (
            <IconButton aria-label="delete" size="small"
              onClick={() => {
                // if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
                //   mutate(params.row._links.car.href); // send http DELETE request
                // } 
              }}       
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          ),
        },
      ]; 

    return (
        <div className="bg-container">
            <div className="tbl-container">
            <DataGrid 
                // rows={data}
                rows={students}
                columns={columns}
                disableRowSelectionOnClick={true}
                getRowId={row => row.studentId}
                // slots={{ toolbar: GridToolbar }}
                // pagination={false}
                // disablePagination={true}
                // style={{ fontFamily: 'Roboto, sans-serif' }} // Setting font family
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'hot' : 'cold'
                }
                sx={{
                    boxShadow: 2,
                    // border: 2,
                    // borderColor: '#274e13',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                    '& .cold': {
                        backgroundColor: 'whitesmoke',
                        color: 'black',
                      },
                      '& .hot': {
                        backgroundColor: 'lightgray',
                        color: 'black',
                      },
                }}
            />
            {/* <div className="tbl-container">
                    {students.map(e => <div className="row-container">
                            <div>{e.studentId}</div>
                            <div>{e.name}</div>
                            <div>{e.major}</div>
                            <div>{e.year}</div>
                        </div> 
                    )}
            </div> */}
            </div>
        </div>
    );
}

export default Table;