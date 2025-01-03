import { useParams, useNavigate } from "react-router-dom";
import makeApiCall from "../../common/makeApiCall";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  IconButton,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import apiEndPoints from "../../common/endpoints";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import EditPageHeader from "./EditPageHeader";
import { setUserData } from "../../redux/Slices/EmployeeHeader";

const EditEmployee = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [getemployee, setEmployee] = useState({
    fullName: "",
    image: "",
    age: "",
    salary: "",
    email: "",
    phone: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const empHeadVal = useSelector((state) => state.empHead);

  const getElementById = async () => {
    setLoader(true);
    try {
      const response = await makeApiCall(
        "GET",
        `${apiEndPoints.getEmployeeById}/${id}`
      );
      // console.log("response:",response.data)
      const emp = response.data;

      setEmployee({
        fullName: emp.fullName,
        image:
          emp.image ||
          "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png",
        age: emp.age,
        email: emp.email,
        phone: emp.phone,
        salary: emp.salary,
      });
      setImageUrl(emp.image);

      dispatch(setUserData({ fullName: emp.fullName, image: emp.image }));
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name, value", name, value);
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle modal open/close
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      salary: getemployee.salary,
      fullName: getemployee.fullName,
      email: getemployee.email,
      phone: getemployee.phone,
      age: getemployee.age,
      image: imageUrl !== getemployee.image ? imageUrl : getemployee.image, // Update if changed
    };
    try {
      const response = await makeApiCall(
        "PUT",
        `${apiEndPoints.updateEmployee}/${id}`,
        updatedData
      );
      if (response.isSuccess) {
        setOpenSnackbar(true);
        setAlertMessage(response.message);
        dispatch(
          setUserData({
            fullName: getemployee.fullName,
            image: getemployee.image,
          })
        );
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoader(false);
    }
  };

  // Save image URL and close modal
  const handleSaveImage = async () => {
    try {
      const response = await makeApiCall(
        "PUT",
        `${apiEndPoints.updateEmployee}/${id}`,
        { ...getemployee, image: imageUrl }
      );
      if (response.isSuccess) {
        setOpenSnackbar(true);
        setAlertMessage("Image Updated!");
        dispatch(
          setUserData({
            fullName: getemployee.fullName,
            image: imageUrl,
          })
        );
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      handleCloseModal();
    }
  };

  useEffect(() => {
    //console.log("Id:",id)
    getElementById();
  }, [id]);

  return (
    <>
      {loader ? (
        <>
          <div className="loader">
            <div className="loader-inner"></div>
          </div>
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <EditPageHeader />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "12px",
              gap: "8px",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* Profile Image */}
              <Avatar
                src={empHeadVal.image}
                alt="profile_pic"
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  marginTop: "8px",
                }}
              />
              {/* Edit Icon */}
              <IconButton
                onClick={handleOpenModal}
                style={{
                  position: "absolute",
                  top: "120px",
                  right: "8px",
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  border: "1px solid rgb(243 236 236)",
                }}
              >
                <EditIcon />
              </IconButton>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "16px",
                width: "500px",
              }}
            >
              <TextField
                label="Name"
                name="fullName"
                value={getemployee.fullName}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                value={getemployee.email}
                onChange={handleChange}
                type="email"
                fullWidth
                required
              />

              <TextField
                label="Phone"
                name="phone"
                value={getemployee.phone}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={getemployee.age}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Salary"
                name="salary"
                type="number"
                value={getemployee.salary}
                onChange={handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ background: "#ffaa17", color: "#000" }}
                fullWidth
              >
                Save Changes
              </Button>
            </form>
            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="edit-image-modal"
              aria-describedby="modal-to-edit-profile-image"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <h2 id="edit-image-modal">Edit Profile Image</h2>
                <TextField
                  label="Image URL"
                  value={imageUrl}
                  onChange={(e) => {
                    return setImageUrl(e.target.value);
                  }}
                  fullWidth
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button
                    onClick={handleSaveImage}
                    variant="contained"
                    sx={{ background: "#ffaa17", color: "#000" }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    variant="contained"
                    sx={{ background: "rgb(247 38 38)" }}
                  >
                    Cancel
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
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
    </>
  );
};

export default EditEmployee;
