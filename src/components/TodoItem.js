import React, { Component } from "react";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Box } from "@material-ui/core";
import EditTodoDialog from "./EditTodoDialog";
import { connect } from "react-redux";
import { markComplete, delTodo } from "../actions/todos";

export class Todoitem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
    };
  };
  render() {
    const { id, title, date, completed } = this.props.todo;
    return (
      <Box
        onClick={this.onClick}
        border="1px solid gray"
        borderTop={0}
        display="flex"
        justifyContent="flex-end"
        width="100%"
        paddingLeft={2}
      >
        <Box flexGrow={1} textAlign="left">
          <FormControlLabel
            control={
              <Checkbox
                checked={completed}
                onChange={() => this.props.markComplete(this.props.todo)}
                name="checkedB"
                color="primary"
              />
            }
            label={title + date}
          />
        </Box>
        <Box mx={0}>
          <IconButton onClick={this.props.openEditTodoDialog}>
            <EditIcon />
          </IconButton>
        </Box>
        <Box ml={0}>
          <IconButton onClick={() => this.props.delTodo(id)}>
            <DeleteIcon />
          </IconButton>
          <EditTodoDialog
            open={this.props.isEdit}
            handleClose={this.props.handleClose}
            todo={this.props.todo}
            inClick={this.props.openEditTodoDialog}
          />
        </Box>
      </Box>
    );
  }
}
Todoitem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default connect(null, { markComplete, delTodo })(Todoitem);
