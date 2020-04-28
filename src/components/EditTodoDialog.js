import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DatePicker from "../Datepicker";

export default class EditTodoDialog extends Component {
  state = {
    todo: {},
  };

  componentDidMount() {
    this.setState({
      todo: { ...this.props.todo },
    });
  }
  onClick = () => {
    this.props.editTodo(this.state.todo);
    this.handleClose();
  };
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      todo: { ...this.state.todo, title: e.target.value },
    });
  };
  handleClose = () => {
    this.props.handleClose();
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit todo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="editTodo"
              label="edit todo"
              type="text"
              value={this.state.todo.title}
              onChange={this.onChange}
              fullWidth
            />
            <DatePicker />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.onClick} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
