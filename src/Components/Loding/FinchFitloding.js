import { Box } from '@mui/material'
import React from 'react'
import "./loding.css";
import LocalDiningTwoToneIcon from "@mui/icons-material/LocalDiningTwoTone";
import { SecondaryColor, textColor } from '../../Color.Config';


function FinchFitloding() {
  return (
    <div>
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
            fontSize: { sm: "70px", xs: "60px" },
            margin: "auto",
          }}
        />
        <h6>
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
        </h6>
      </Box>
    </div>
  )
}

export default FinchFitloding