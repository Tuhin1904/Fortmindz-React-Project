import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, IconButton,  Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import makeApiCall from '../../common/makeApiCall';
import apiEndPoints from '../../common/endpoints';
import './homepage.css'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [openModal, setOpenModal] = useState(false); 

    const navigate = useNavigate();

    //Show Delete Modal
    const handleOpenModal = (employeeId) => {
        setEmployeeToDelete(employeeId);
        setOpenModal(true);
      };

      //Close Delete Modal
      const handleCloseModal = () => {
        setOpenModal(false);
        setEmployeeToDelete(null);
      };


      //Api call for Delete Employee
      const handleDelete = async() => {
        setEmployeeList((prev)=>{
                console.log("prev", prev);
                return prev.filter((item) => item._id !== employeeToDelete )
        })
        try{
            await makeApiCall('DELETE',`${apiEndPoints.removeEmployee}/${employeeToDelete}`)
        }catch(err){
            console.log("Error:", err)
        }finally{
            handleCloseModal();
        }
        
      };

    const loadEmployeeList = async() =>{
            try{
                const response = await makeApiCall('GET',apiEndPoints.getEmployeeList,null,null)
                setEmployeeList(response.data || [])
            }catch(err){
                console.log(err)
            }finally{
                setLoading(false)
            }
    }

    useEffect(()=>{
        loadEmployeeList()
    },[])

    const formatDate = (date) => { 
        const newDate = date.slice(0,10)
        return newDate.split('-').reverse().join('-');
    }


  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#ffaa17' }}>
        Welcome to the FORTMINDZ!
      </Typography>
      {loading ? (
        <div className="loader">
            <div className="loader-inner">
        </div>
    </div>
      ) : (
        // Employee Table
        <Box sx={{ width: '80%', marginTop: '20px' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    ID
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Name
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Email
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Phone No.
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Salary(Rs)
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Age
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Created Date(DD/MM/YYYY)
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Action
                  </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeList.map((employee,serial) => (
                  <TableRow key={employee._id}>
                    <TableCell align="left" title={employee._id} sx={{cursor:'pointer'}}>{serial+1}</TableCell>
                    <TableCell align="left"  className="employee-cell">
                        <img className='profileImg' src={employee.image} alt='employee_img'/>
                        {employee.fullName}
                    </TableCell>
                    <TableCell align="left">{employee.email}</TableCell>
                    <TableCell align="left">{employee.phone}</TableCell>
                    <TableCell align="left">{employee.salary}</TableCell>
                    <TableCell align="left">{employee.age}</TableCell>
                    <TableCell align="left">
                        {formatDate(employee.createdAt)}
                    </TableCell>
                    <TableCell align="center">
                        <div className="action-buttons">
                                <IconButton color="primary" aria-label="edit" onClick={() => navigate(`/edit/${employee._id}`)}>
                                   <EditIcon />
                                </IconButton>
                        
                                <IconButton
                                    sx={{ color: 'rgb(247 38 38)' }} 
                                    aria-label="delete"
                                    onClick={() => handleOpenModal(employee._id)} // 
                                >
                                    <DeleteIcon />
                                </IconButton>
                        </div>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                Are you sure you want to delete this employee?
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} sx={{color:'red'}}>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
      )}

    </Box>
  )
}

export default HomePage