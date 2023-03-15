import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react'

function Ij() {
    const [getInput, setGetInput] = useState({
        name:"",
        hobby:[]
    })
    console.log(getInput)
  return (
    <div>
    <Autocomplete
        multiple
        disableCloseOnSelect
        size="small"
        color="primary"
        sx={{ width: "250px"}}
        options={servicesData}
        getOptionLabel={(option) => option.service}
        onChange={(event, newValue) => {
          setGetInput({...getInput, hobby: newValue.map(item => item.service)});
      }}
        renderInput={(params) => (
          <TextField
            size='small'
            label="Hobby"
            {...params}
          />
        )}
      />
     <TextField
          select
          sx={{width:"250px"}}
          size='small'
          label="Name"
          onChange={(e)=>{setGetInput({...getInput, name: e.target.value})}}
        >
          {servicesData.map((option) => (
            <MenuItem key={option.service} value={option.service}>
              {option.service}
            </MenuItem>
          ))}
        </TextField>
    </div>
  )
}

const servicesData = [
    { service: "HouseKeeping" },
    { service: "Child Care" },
    { service: "Elder Care" },
    { service: "Cooking" },
    { service: "Driving" },
    { service: "Others" },
  ];
export default Ij;

