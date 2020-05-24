import { Box, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { delTodo, markComplete } from "../actions/todos";
import { dateTimeToDate } from "../helpers/DateHelpers";
import TodoItemMenu from "./TodoItemMenu";
import { SubtaskTodo } from "./SubtaskTodo";

export class Todoitem extends Component {
  state = {
    lookSubtask: false,
  };
  setView = () => {
    this.setState({
      lookSubtask: !this.state.lookSubtask,
    });
  };
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none",
    };
  };
  render() {
    const view = this.state.lookSubtask ? (
      <ExpandLessIcon />
    ) : (
      <ExpandMoreIcon />
    );
    const { title, dueDate, completed } = this.props.todo;
    return (
      <React.Fragment>
        <Box
          onClick={this.onClick}
          borderBottom="1px solid lightgray"
          borderTop={0}
          display="flex"
          justifyContent="flex-end"
          width="100%"
          paddingLeft={2}
          py={1}
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
          <Box>
            <TodoItemMenu todo={this.props.todo} />
          </Box>
          <Box>
            {this.props.subtasks && this.props.subtasks.length > 0 && (
              <IconButton
                onClick={this.setView}
                lookSubtask={this.state.lookSubtask}
              >
                {view}
              </IconButton>
            )}
          </Box>
        </Box>
        {this.state.lookSubtask &&
          this.props.subtasks.map((subtask) => (
            <SubtaskTodo
              key={subtask.id}
              todo={subtask}
              markComplete={this.props.markComplete}
            />
          ))}
      </React.Fragment>
    );
  }
}
Todoitem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default connect(null, { markComplete, delTodo })(Todoitem);
