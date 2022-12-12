import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  action: () => void,
  handleClose: () => void,
  title: string,
  description: string,
  confirmButton: string

}

export default function Popup({ open, action, handleClose, title, description, confirmButton }: Props) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Delete confirmation"
        aria-describedby={title}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={btnsContainer}>
          <Button variant="outlined" sx={{ color: 'black', border: "none" }} onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button variant="contained" sx={{ color: 'white' }} onClick={action}>{confirmButton}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const btnsContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '1rem'
}
