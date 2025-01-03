import { useParams, useNavigate } from 'react-router-dom';
import makeApiCall from '../../common/makeApiCall';
import { TextField, Button, Box, Typography, Avatar, IconButton, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import apiEndPoints from '../../common/endpoints';
import EditIcon from "@mui/icons-material/Edit";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [getemployee, setEmployee] = useState({fullName: '', image:'', age:'', salary:'',email:'',phone:''})


    const getElementById = async() => {
        setLoader(true);
        try{
            const response = await makeApiCall('GET', `${apiEndPoints.getEmployeeById}/${id}`)
            // console.log("response:",response.data)
            const emp = response.data
            setEmployee({
                fullName:emp.fullName,
                image:emp.image || 'https://plus.unsplash.com/premium_photo-1671656333460-793292581bc6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                age:emp.age,
                email:emp.email,
                phone:emp.phone,
                salary:emp.salary
            })
            setImageUrl(emp.image)
        }catch(err){
            console.log("Error:",err)
        }finally{
            setLoader(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("name, value",name , value)
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    // Handle modal open/close
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();
      
        const updatedData = {
            fullName: getemployee.fullName,
            email: getemployee.email,
            phone: getemployee.phone,
            age: getemployee.age,
            image: imageUrl !== getemployee.image ? imageUrl : getemployee.image, // Update if changed
        };
        try {
            
            const response = await makeApiCall('PUT', `${apiEndPoints.updateEmployee}/${id}`, updatedData);
            console.log("response:", response)
        } catch (err) {
            console.error("Error:", err);
          
        } finally {
            setLoader(false);
        }

    }

  // Handle image URL update

  // Save image URL and close modal
  const handleSaveImage = () => {
      handleCloseModal();
  };

  useEffect(()=>{
    //console.log("Id:",id)
    getElementById();
  },[id])
    
  return (
    <>
      {loader ? <> 
        <div className="loader">
            <div className="loader-inner"></div>
        </div>
        </> : 
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                backgroundColor: '#f5f5f5',
                boxShadow: 1,
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                Update Page
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6">{getemployee.fullName}</Typography>
                    <Avatar src={getemployee.image} alt={getemployee.name} sx={{ width: 50, height: 50 }} />
                
                </Box>
            </Box>

            <div style={{display:'flex',justifyContent:'center',padding:'12px',gap:'8px'}}>
            <div style={{ position: "relative" }}>
            {/* Profile Image */}
            <img
            src={getemployee.image}
            alt="profile_pic"
            style={{
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
                border:'1px solid rgb(243 236 236)'
            }}
            >
            <EditIcon />
            </IconButton>
        </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px',padding:'16px',width:'500px' }}>   
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
                        value={getemployee.age}
                        onChange={handleChange}
                        fullWidth          
                        />
                        <TextField
                        label="Salary"
                        name="salary"
                        value={getemployee.salary}
                        onChange={handleChange}
                        fullWidth          
                        />
                    <Button type="submit" variant="contained" sx={{ background:'#ffaa17',color:'#000' }} fullWidth>
                            Save Changes
                    </Button>
            </form>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="edit-image-modal"
                aria-describedby="modal-to-edit-profile-image" >
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
                          return  setImageUrl(e.target.value)
                        }}
                        fullWidth
                    />
                    <div style={{display:'flex',gap:'8px'}}>
                        <Button
                            onClick={handleSaveImage}
                            variant="contained"
                            sx={{ background:'#ffaa17',color:'#000' }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => setIsModalOpen(false)}
                            variant="contained"
                            sx={{ background: 'rgb(247 38 38)' }} 
                        >
                            Cancel
                        </Button>
                    </div>
                    </Box>
            </Modal>
            </div>       
        </Box>
       }
    </>
  )
}

export default EditEmployee