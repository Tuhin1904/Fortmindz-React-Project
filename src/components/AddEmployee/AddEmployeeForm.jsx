import { Button, TextField, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import "./addEmp.css";
import makeApiCall from "../../common/makeApiCall";
import apiEndPoints from "../../common/endpoints";
import InputMask from "react-input-mask";

const AddEmployeeForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    salary: "",
    image: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.age ||
      !formData.salary
    ) {
      return;
    }
    try {
      const response = await makeApiCall(
        "POST",
        apiEndPoints.createEmployee,
        formData
      );
      if (response.code == 201) {
        onSuccess();
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          age: "",
          salary: "",
          image: "",
        });
      }
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <div>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
            required
          />
        </div>
        <div>
          <InputMask
            mask="+91 9999 999 999"
            value={formData.phone}
            onChange={handleChange}
          >
            {() => <TextField label="Phone" name="phone" fullWidth required />}
          </InputMask>
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div>
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Image Link"
            name="image"
            value={formData.image}
            onChange={handleChange}
            fullWidth
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{ background: "#ffaa17", color: "#000", textTransform: "none" }}
        >
          Add Employee
        </Button>
      </form>
    </>
  );
};

export default AddEmployeeForm;
