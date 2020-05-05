import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DatePicker from "../Datepicker";
import { editTodo } from "../actions/todos";
import { connect } from "react-redux";

class EditTodoDialog extends Component {
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
  setDate = (date) => {
    this.setState({
      todo: { ...this.state.todo, dueDate: date },
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
              label="Title"
              type="text"
              value={this.state.todo.title}
              onChange={this.onChange}
              fullWidth
            />
            <DatePicker
              onChange={this.setDate}
              value={this.state.todo.dueDate}
              label="Due Date"
              helperText="Optional"
            />
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
export default connect(null, { editTodo })(EditTodoDialog);
