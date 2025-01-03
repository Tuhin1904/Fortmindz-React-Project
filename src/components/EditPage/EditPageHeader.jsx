import { Avatar, Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";

const EditPageHeader = () => {
  const empHeadVal = useSelector((state) => state.empHead);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#f5f5f5",
        boxShadow: 1,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ marginBottom: 2 }}
      >
        <Link color="inherit" href="/">
          Employees
        </Link>
        <Typography color="textPrimary">Update Page</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h6">{empHeadVal.fullName}</Typography>
        <Avatar
          src={
            empHeadVal.image ||
            "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
          }
          alt={empHeadVal.name}
          sx={{ width: 50, height: 50 }}
        />
      </Box>
    </Box>
  );
};

export default EditPageHeader;
