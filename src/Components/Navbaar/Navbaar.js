import { Avatar, Box } from '@mui/material'
import React from 'react'
import { PrimaryColor, textColor } from '../../Color.Config'
import pinchFit from "../../Images/PinchFit.png"
import { auth } from '../../firebase-config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


function Navbaar() {
    const pic = localStorage.getItem("userPhoto")
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await signOut(auth);
          navigate("/login")
        } catch (error) {
          alert("erro");
        }
      };
  return (
    <Box sx={{width:"100%", display:"flex", justifyContent:"space-between", padding:"10px", bgcolor:"white", alignItems:"center"}}>
        <img style={{marginLeft:"20px"}} width={"60px"} src={pinchFit} alt="Pinch fit" />
      <Box sx={{display:"flex", alignItems:"center", gap:"20px", color:textColor, fontWeight:"600", marginRight:"20px"}}>
      <Box> Meals </Box>
      <Box> Profile </Box>
      <Box><Avatar onClick={handleLogout} alt="" src={pic} /></Box>
      </Box>
    </Box>
  )
}

export default Navbaar