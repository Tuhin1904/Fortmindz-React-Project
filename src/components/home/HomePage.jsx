import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Avatar,
  Breadcrumbs,
} from "@mui/material";
import { useEffect, useState } from "react";
import makeApiCall from "../../common/makeApiCall";
import apiEndPoints from "../../common/endpoints";
import "./homepage.css";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddEmployeeForm from "../AddEmployee/AddEmployeeForm";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";

const HomePage = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
  const handleDelete = async () => {
    setEmployeeList((prev) => {
      // console.log("prev", prev);
      return prev.filter((item) => item._id !== employeeToDelete);
    });
    try {
      await makeApiCall(
        "DELETE",
        `${apiEndPoints.removeEmployee}/${employeeToDelete}`
      );
      setOpenSnackbar(true);
      setAlertMessage("Employee Deleted!");
    } catch (err) {
      console.log("Error:", err);
    } finally {
      handleCloseModal();
    }
  };

  const loadEmployeeList = async () => {
    try {
      const response = await makeApiCall(
        "GET",
        apiEndPoints.getEmployeeList,
        null,
        null
      );
      setEmployeeList(response.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = () => {
    setShowAddModal(true);
  };

  useEffect(() => {
    loadEmployeeList();
  }, []);

  const formatDate = (date) => {
    const newDate = date.slice(0, 10);
    return newDate.split("-").reverse().join("-");
  };

  return (
    <Box
      sx={{
        padding: "0 20px 20px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "8px 20px",
          bgcolor: "#ffffff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ marginBottom: 2 }}
        >
          <Typography color="textPrimary" component="h1" variant="h4">
            {/* Employees List */}
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#ffaa17" }}
        >
          Welcome to the FORTMINDZ!
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: "#ffaa17",
            color: "#000",
            textTransform: "none",
          }}
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ marginTop: "20px", textAlign: "center" }}>
        <Typography variant="body1">
          Manage all your employee records efficiently for Fortmindz.
        </Typography>
      </Box>
      {loading ? (
        <div className="loader">
          <div className="loader-inner"></div>
        </div>
      ) : (
        // Employee Table
        <Box sx={{ width: "80%", marginTop: "20px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    ID
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Phone No.
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Salary(Rs)
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Age
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Created Date(DD/MM/YYYY)
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Updated Date(DD/MM/YYYY)
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeList.map((employee, serial) => (
                  <TableRow key={employee._id}>
                    <TableCell
                      align="left"
                      title={employee._id}
                      sx={{ cursor: "pointer" }}
                    >
                      {serial + 1}
                    </TableCell>
                    <TableCell align="left" className="employee-cell">
                      <Avatar
                        className="profileImg"
                        src={
                          employee.image ||
                          "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
                        }
                        alt="employee_img"
                      />
                      {employee.fullName}
                    </TableCell>
                    <TableCell align="left">{employee.email}</TableCell>
                    <TableCell align="left">{employee.phone}</TableCell>
                    <TableCell align="left">{employee.salary}</TableCell>
                    <TableCell align="left">{employee.age}</TableCell>
                    <TableCell align="center">
                      {formatDate(employee.createdAt)}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(employee.updatedAt)}
                    </TableCell>
                    <TableCell align="center">
                      <div className="action-buttons">
                        <IconButton
                          color="primary"
                          aria-label="edit"
                          onClick={() => navigate(`/edit/${employee._id}`)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          sx={{ color: "rgb(247 38 38)" }}
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
              <Button onClick={handleDelete} sx={{ color: "red" }}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogContent>
              <AddEmployeeForm
                onSuccess={() => {
                  loadEmployeeList();
                  setShowAddModal(false);
                  setOpenSnackbar(true);
                  setAlertMessage("New Employee Added!");
                }}
              />
            </DialogContent>
          </Dialog>
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} // Snackbar shows for 2 seconds
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
