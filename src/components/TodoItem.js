import React, { Component } from "react";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Box, Typography } from "@material-ui/core";
import EditTodoDialog from "./EditTodoDialog";
import { connect } from "react-redux";
import { markComplete, delTodo } from "../actions/todos";
import { dateTimeToDate } from "../helpers/DateHelpers";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

export class Todoitem extends Component {
  state = {
    isEdit: false,
  };
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
    };
  };

  openEditTodoDialog = () => {
    this.setState({ isEdit: true });
  };
  handleClose = () => {
    this.setState({ isEdit: false });
  };
  render() {
    const { id, title, dueDate, completed } = this.props.todo;
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
            label={
              <React.Fragment>
                <Typography variant="body1">{title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {dueDate && dateTimeToDate(dueDate)}
                </Typography>
              </React.Fragment>
            }
          />
        </Box>
        {/* <Box mx={0}>
          <Tooltip title="Add subtaak">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box> */}
        <Box mx={0}>
          <Tooltip title="Edit">
            <IconButton onClick={this.openEditTodoDialog}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box ml={0}>
          <Tooltip title="Delete">
            <IconButton onClick={() => this.props.delTodo(id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <EditTodoDialog
            open={this.state.isEdit}
            handleClose={this.handleClose}
            todo={this.props.todo}
            onClick={this.openEditTodoDialog}
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
