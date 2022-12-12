import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  handleDeleteRequest: () => void,
  handleClose: () => void
}
 
export default function Popup({ open, handleDeleteRequest, handleClose }: Props) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Delete confirmation"
        aria-describedby="Are you sure you want to delete this request?"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this request?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversable.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDeleteRequest}>Delete request</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
