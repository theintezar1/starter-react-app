import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { PrimaryColor, SecondaryColor, textColor } from "../../Color.Config";
import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone";
import { useNavigate } from "react-router-dom";
import food from "../../Images/food.jpg";
import { auth, googleProvider } from "../../firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import GoogleButton from "react-google-button";

const BOX = styled(Box)({
  backgroundImage: `url(${food})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100%",
  borer: "1px solid red",
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  console.log(auth?.currentUser?.photoURL);
  console.log(auth?.currentUser?.uid);

  const handleAuth = async () => {
    const userId = await auth?.currentUser?.uid;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User Successfully Sign in");
      localStorage.setItem("userId", userId);
      navigate("/customer_requirements")
    } catch (error) {
      alert(error);
    }
  };

  const signInWithGoogle = async () => {
    const userId = await auth?.currentUser?.uid;
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/customer_requirements")
      localStorage.setItem("userId", userId);
      await localStorage.setItem("userPhoto", auth.currentUser.photoURL)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: PrimaryColor,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: { sm: "nowrap", xs: "wrap-reverse" },
            width: { sm: "70%", xs: "100%" },
            height: { sm: "500px", xs: "100vh" },
            bgcolor: "white",
          }}
        >
          <Box
            width={500}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: { xs: "-80px" },
            }}
          >
            <Box
              sx={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                paddingTop:{sm:"70px", xs:"10px"}
              }}
            >
              <LocalDiningTwoToneIcon
                sx={{
                  color: SecondaryColor,
                  fontSize: { sm: "80px", xs: "80px" },
                  margin: "auto",
                }}
              />
              <h5>
                <span
                  style={{
                    color: SecondaryColor,
                    padding: "5px 5px 1px 5px",
                    backgroundColor: textColor,
                  }}
                >
                  PINCH
                </span>
                &nbsp;<span style={{ color: textColor }}>FIT</span>
              </h5>
            </Box>
            <TextField
              sx={{ width: "220px" }}
              size="small"
              label="Email"
              autoComplete="off"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              sx={{ width: "220px" }}
              size="small"
              label="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              onClick={handleAuth}
              style={{
                padding: "10px",
                width: "220px",
                backgroundColor: SecondaryColor,
                border: "none",
                color: textColor,
                fontWeight: "800",
                fontSize: "18px",
              }}
            >
              Login
            </button>
            <GoogleButton
              onClick={signInWithGoogle}
              style={{
                width: "220px",
                backgroundColor: SecondaryColor,
                color: textColor,
                fontWeight: "700",
                padding: 0,
              }}
            />
            <p>
              Not a member?&nbsp;
              <span onClick={()=>{navigate('/signup')}} style={{ color: SecondaryColor, cursor:"pointer" }}>Signup now</span>
            </p>
          </Box>
          <BOX></BOX>
        </Box>
      </Box>
    </div>
  );
}

export default Login;
