import React, { Component } from "react";
import { connect } from "react-redux";
import { markComplete, delTodo } from "../actions/todos";
import { Box, Typography } from "@material-ui/core";
import SubtaskTodoItemMenu from "./SubtaskTodoItemMenu";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { dateTimeToDate } from "../helpers/DateHelpers";

export class SubtaskTodo extends Component {
  setCompleted = () => {
    this.props.todo.completed = !this.props.todo.completed;
  };

  handleChange = () => {
    this.props.markComplete(this.props.todo);
    this.setCompleted();
  };

  render() {
    const getStyle = {
      textDecoration: this.props.todo.completed ? "line-through" : "none",
    };

    const { title, dueDate } = this.props.todo;
    return (
      <React.Fragment>
        <Box
          onClick={this.onClick}
          borderBottom="1px solid lightgray"
          borderTop={0}
          display="flex"
          justifyContent="flex-end"
          width="90%"
          paddingLeft={2}
          ml="10%"
        >
          <Box flexGrow={1} textAlign="left">
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.props.todo.completed}
                  onChange={this.handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label={
                <React.Fragment>
                  <Typography variant="body1" style={getStyle}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dueDate && dateTimeToDate(dueDate)}
                  </Typography>
                </React.Fragment>
              }
            />
          </Box>
          <Box>
            <SubtaskTodoItemMenu todo={this.props.todo} />
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

export default connect(null, { delTodo, markComplete })(SubtaskTodo);
