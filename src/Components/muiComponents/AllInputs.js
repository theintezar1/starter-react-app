import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react'
import { textColor } from '../../Color.Config';

 function TextFields(props) {
    const {name, input, setInput, selected, data, disable} = props;
  return (
    <div>
        <TextField
          select={selected}
          sx={{width:"250px"}}
          size='small'
          disabled={disable}
          label={name}
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}
        >
           <MenuItem key={""} value={""}>Unselect</MenuItem>
          {data?.map((option) => (
            <MenuItem key={name=="Height"?option.key:option} value={name=="Height"?option.value:option}>
              {name=="Height"?option.key:option}
            </MenuItem>
          ))}
        </TextField>
    </div>
  )
}

 function MultipleSelected (props) {
    const {name, input, setInput, data} = props;
  return (
    <div>
        <Autocomplete
        multiple
        disableCloseOnSelect
        size="small"
        color="primary"
        value={input}
        sx={{ width: "250px"}}
        options={data}
        getOptionLabel={(option) => option}
        onChange={(event, newValue) => {
            setInput([...newValue]);
        }}
        renderInput={(params) => (
          <TextField
            size='small'
            label={name}
            {...params}
          />
        )}
      />
    </div>
  )
}

export {TextFields, MultipleSelected}