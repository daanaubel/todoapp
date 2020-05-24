import React, { Component } from "react";
import { addTodo } from "../actions/todos";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { connect } from "react-redux";

class AddSubtaskDialog extends Component {
  state = {
    title: "",
    dueDate: null,
    parentTodo: this.props.todo.id,
  };

  onClick = () => {
    const newTodo = this.state;
    this.props.addTodo(newTodo);
    this.setState({
      title: "",
      dueDate: null,
    });
    this.handleClose();
  };
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  setDate = (date) => {
    this.setState({
      dueDate: date,
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
        <DialogTitle id="add-subtask">Add Subtask</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            value={this.state.title}
            onChange={this.onChange}
            fullWidth
            name="title"
            helperText="Required"
          />
          <DatePicker
            name="dueDate"
            label="Due Date"
            helperText="Optional"
            onChange={this.setDate}
          />
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
export default connect(null, { addTodo })(AddSubtaskDialog);
