import { Box } from "@mui/material";
import React from "react";
import { PrimaryColor, SecondaryColor, textColor } from "../../Color.Config";
import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone";
import { useNavigate } from "react-router-dom"

import "./preview.css";
import { auth } from "../../firebase-config";

function PreviewPage() {
  const navigation = useNavigate();
  
  setTimeout(() => {
    auth.currentUser? navigation("/customer_requirements"):navigation("/login");
  }, 4000);
  return (
    <Box
      sx={{
        bgcolor: PrimaryColor,
        width: "100%",
        minHeight: "100vh",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LocalDiningTwoToneIcon
          className="blink_me"
          sx={{
            color: SecondaryColor,
            fontSize: { sm: "150px", xs: "100px" },
            margin: "auto",
          }}
        />
        <h1>
          <span
            style={{
              color: SecondaryColor,
              padding: "10px 10px 1px 10px",
              backgroundColor: textColor,
            }}
          >
            PINCH
          </span>
          &nbsp;<span style={{ color: textColor }}>FIT</span>
        </h1>
      </Box>
    </Box>
  );
}

export default PreviewPage;
