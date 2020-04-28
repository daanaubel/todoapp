import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Datepicker from "../Datepicker";

export default class AddTodoDialog extends Component {
  state = {
    title: "",
  };
  onClick = () => {
    this.props.addTodo(this.state.title);
    this.handleClose();
  };
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      title: e.target.value,
    });
  };
  handleClose = () => {
    this.props.handleClose();
    this.setState({
      title: "",
    });
  };
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add todo..."
            type="text"
            value={this.state.title}
            onChange={this.onChange}
            fullWidth
          />
          <Datepicker />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.onClick} color="primary">
            Add todo
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
