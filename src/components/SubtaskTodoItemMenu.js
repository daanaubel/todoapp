import { ListItemIcon, ListItemText, Menu } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { connect } from "react-redux";
import { delTodo } from "../actions/todos";
import AddSubtaskDialog from "./AddSubtaskDialog";
import Deletedialog from "./DeleteDialog";
import EditTodoDialog from "./EditTodoDialog";

function TodoItemMenu(props) {
  const intialState = {
    isOpen: false,
    isEdit: false,
    isDelete: false,
    anchorEl: null,
  };
  const [state, setState] = React.useState(intialState);
  const openDeleteDialog = () => {
    setState({ isDelete: true });
  };

  const openEditTodoDialog = () => {
    setState({ isEdit: true });
  };
  const handleClick = (e) => {
    setState({ anchorEl: e.currentTarget });
  };
  const handleClose = (key) => {
    setState(intialState);
  };
  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Paper>
        <Menu
          anchorEl={state.anchorEl}
          keepMounted
          open={Boolean(state.anchorEl)}
          onClose={() => handleClose("anchorEl")}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={openDeleteDialog}>
            <ListItemIcon style={{ minWidth: "32px" }}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
          <MenuItem onClick={openEditTodoDialog}>
            <ListItemIcon style={{ minWidth: "32px" }}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
        </Menu>
      </Paper>
      <EditTodoDialog
        open={state.isEdit}
        handleClose={handleClose}
        todo={props.todo}
      />
      <AddSubtaskDialog
        open={state.isAddSubtask}
        handleClose={() => handleClose()}
        todo={props.todo}
      />
      <Deletedialog
        open={state.isDelete}
        handleClose={() => handleClose("isDelete")}
        todo={props.todo}
      />
    </React.Fragment>
  );
}
export default connect(null, { delTodo })(TodoItemMenu);
