import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import AddMealForm from "../AdminComponents/AddMealForm";
import Navbaar from "../Navbaar/Navbaar";
import { Box } from "@mui/system";
import { PrimaryColor, SecondaryColor } from "../../Color.Config";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BallotIcon from '@mui/icons-material/Ballot';

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, setInput } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <AddMealForm 
      setInput={setInput}
      />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box>
      <Button variant="contained" sx={{bgcolor:SecondaryColor, marginLeft:2, mt:1}} endIcon={<AddCircleOutlineIcon/>} onClick={handleClickOpen}>
        Add Meal
      </Button>
      <Button variant="contained" sx={{bgcolor:SecondaryColor, marginLeft:2, mt:1}} endIcon={<BallotIcon/>} onClick={""}>
        all meals
      </Button>
      <SimpleDialog open={open} setInput={setOpen} onClose={handleClose} />
    </Box>
  );
}
