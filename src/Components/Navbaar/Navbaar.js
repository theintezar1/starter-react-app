// import { Avatar, Box } from '@mui/material'
// import React from 'react'
// import { PrimaryColor, textColor } from '../../Color.Config'
// import pinchFit from "../../Images/PinchFit.png"
// import { auth } from '../../firebase-config'
// import { signOut } from 'firebase/auth'
// import { useNavigate } from 'react-router-dom'

// function Navbaar() {
//     const pic = localStorage.getItem("userPhoto")
//     const navigate = useNavigate();
//     const handleLogout = async () => {
//         try {
//           await signOut(auth);
//           navigate("/login")
//         } catch (error) {
//           alert("erro");
//         }
//       };
//   return (
//     <Box sx={{width:"100%", display:"flex", justifyContent:"space-between", padding:"10px", bgcolor:"white", alignItems:"center"}}>
//         <img style={{marginLeft:"20px"}} width={"60px"} src={pinchFit} alt="Pinch fit" />
//       <Box sx={{display:"flex", alignItems:"center", gap:"20px", color:textColor, fontWeight:"600", marginRight:"20px"}}>
//       <Box onClick={()=>{navigate("/meal_list")}}> Meals </Box>
//       <Box onClick={()=>{navigate("/admin")}}> Admin </Box>
//       <Box><Avatar onClick={handleLogout} alt="" src={pic} /></Box>
//       </Box>
//     </Box>
//   )
// }

// export default Navbaar

import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import pinchFit from "../../Images/PinchFit.png";
import AppsIcon from "@mui/icons-material/Apps";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
// import { MasterAPI } from "../../AllData";

const P = styled("p")({
  fontWeight: "300",
  color: "grey",
  fontFamily: "sans-serif",
  fontSize: "14px",
});

function Navbaar() {
  let navigate = useNavigate();

  const handleonclickLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert("erro");
    }
  };
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pic = localStorage.getItem("userPhoto");
  console.log("pic is",pic)

  return (
    <Box
      sx={{
        position:"fixed",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        bgcolor: "white",
        alignItems: "center",
        zIndex:999,
      }}
    >
      <img
        style={{ marginLeft: "20px" }}
        width={"60px"}
        src={pinchFit}
        alt="Pinch fit"
      />

      <Box>
        <Box
          sx={{ marginRight: { xs: "35px" } }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onMouseOver={handleClick}
        >
        <Avatar alt="" src={pic} sx={{mr:"27px"}}/>
        </Box>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Box sx={{ p: "20px 20px 0px 20px", backgroundColor: "" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                padding: "0px",
              }}
            >
           <Avatar alt="" src={pic} />

            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                padding: "20px",
              }}
            >
            </Box>
            <MenuItem
              sx={{
                color: "grey",
                fontFamily: "sans-serif",
                fontWeight: "300",
                p: "10px",
              }}
              onClick={() => {
                handleClose();
                navigate("/customer_requirements");
              }}
            >
              <AppsIcon /> &nbsp; Profile
            </MenuItem>
            <MenuItem
              sx={{
                color: "grey",
                fontFamily: "sans-serif",
                fontWeight: "300",
                p: "10px",
              }}
              onClick={() => {
                handleClose();
                handleonclickLogOut();
              }}
            >
              <LogoutIcon /> &nbsp; Logout
            </MenuItem>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
}

export default Navbaar;
