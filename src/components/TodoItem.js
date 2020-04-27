import React, { Component } from "react";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Box } from "@material-ui/core";

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
    const { id, title, completed } = this.props.todo;
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
                onChange={() => this.props.markComplete()}
                name="checkedB"
                color="primary"
              />
            }
            label={title}
          />
        </Box>
        <Box display="none" mx={0}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Box>
        <Box ml={0}>
          <IconButton onClick={this.props.delTodo.bind(this, id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }
}
Todoitem.propTypes = {
  todos: PropTypes.object.isRequired,
};
// const btnStyle = {
//   background: "#ff0000",
//   color: "#fff",
//   border: "none",
//   padding: "5px 10px",
//   borderRadius: "50%",
//   cursor: "pointer",
//   float: "right",
// };

export default Todoitem;
