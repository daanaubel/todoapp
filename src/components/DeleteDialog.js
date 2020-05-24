import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { delTodo } from "../actions/todos";
import { connect } from "react-redux";

function Deletedialog(props) {
  const handleClose = () => {
    props.handleClose();
  };
  const onClick = () => {
    handleClose();
    props.delTodo(props.todo.id);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Weet je zeker dat je deze Todo wilt verwijderen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuleer
          </Button>
          <Button onClick={onClick} color="secondary" autoFocus>
            Verwijder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default connect(null, { delTodo })(Deletedialog);
