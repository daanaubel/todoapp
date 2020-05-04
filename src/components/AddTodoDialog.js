import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DatePicker from "../Datepicker";
import DateFnsUtils from "@date-io/date-fns";
import { addTodo } from "../actions/todos";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { connect } from "react-redux";
class AddTodoDialog extends Component {
  state = {
    title: "",
    dueDate: "",
  };
  onClick = () => {
    const newTodo = this.state;
    this.props.addTodo(newTodo);
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
        <DialogTitle id="form-dialog-title">Add todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Add todo..."
            type="text"
            value={this.state.title}
            onChange={this.onChange}
            fullWidth
            name="title"
          />
          <DatePicker
            name="dueDate"
            onChange={this.setDate}
            value={this.state.dueDate}
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
export default connect(null, { addTodo })(AddTodoDialog);
