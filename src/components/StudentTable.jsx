import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api/studentAPI";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import SearchBox from './SearchBox';
import "./StudentTable.css";


function StudentTable() {
  const [students, setStudents] = useState([]);

  const [filteredStudents, setFilteredStudents] = useState([]); // for search adds on 2024-11-07

  // Filter students based on search input; adds on 2024-11-07
  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = students.filter(
      (student) =>
        student.studentId.toString().includes(lowerCaseQuery) ||
        student.name.toLowerCase().includes(lowerCaseQuery) ||
        student.major.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredStudents(filtered);
  };


  const fetchStudents = async () => {
    const response = await axios.get(`${API_URL}`);
    setStudents(response.data);
    setFilteredStudents(response.data);
  };

  // Function to handle new student addition
  const handleStudentAdded = (newStudent) => {
    // Add new student to both students and filteredStudents arrays
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    setFilteredStudents((prevFiltered) => [...prevFiltered, newStudent]);
  };

  const deleteStudent = async (studentId) => {
    await axios.delete(`${API_URL}/${studentId}`);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleClickDelete = (studentId) => {
    deleteStudent(studentId);
  }

  const columns = [
    { field: 'studentId', headerName: 'Student ID', width: 120, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
    { field: 'name', headerName: 'Name', width: 180, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
    { field: 'major', headerName: 'Major', width: 180, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
    { field: 'year', headerName: 'Year', width: 80, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
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
        <EditStudent studentData={params.row} setStudents={setStudents} />
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
        <Tooltip data-testid={`delete-button-row-${params.row.studentId}`} title="Delete Student">
          <IconButton aria-label="delete" size="small" onClick={() => handleClickDelete(params.row.studentId)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="bg-container">
      <div className="tbl-container">

        <SearchBox onSearch={handleSearch} /> {/* Render SearchBox with handleSearch adds on 2024-11-07*/}

        <div className="btn-container">
          <AddStudent onStudentAdded={handleStudentAdded} />
        </div>
        <DataGrid 
          data-testid="student-table"
          rows={filteredStudents} // change to filteredStudents on 2024-11-07
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row.studentId}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'hot' : 'cold'
          }
          sx={{
            boxShadow: 2,
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            '& .cold': {
              backgroundColor: '#e7f0f7',
              color: 'black',
            },
            '& .hot': {
              backgroundColor: '#ccdfef',
              color: 'black',
            },
          }}
        />
      </div>
    </div>
  );
}

export default StudentTable;