import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AuthServices from "../../api/services/auth-services";

const TodoPage = () => {
  const [todoData, setTodoData] = useState([]);
  const [addTodoData, setAddTodoData] = useState("");

  const onClickEditTodo = (id) => {
    const editTodoData = todoData.map((todo) =>
      todo?._id === id ? { ...todo, edit: !todo.edit } : todo
    );
    setTodoData(editTodoData);
  };

  const todoUpdateData = (value, id) => {
    const updateTodoData = todoData.map((todo) =>
      todo?._id === id ? { ...todo, list: value } : todo
    );
    setTodoData(updateTodoData);
  };

  const getTodoListData = () => {
    AuthServices.getTodoList()
      .then((response) => {
        const addEditStatus =
          response.length > 0
            ? response.map((todo) => {
                return {
                  ...todo,
                  edit: false,
                };
              })
            : response;
        setTodoData(addEditStatus);
        // console.log(addEditStatus);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTodoListData = () => {
    // console.log(addTodoData);
    const formData = new FormData();
    formData.append("list", addTodoData);

    AuthServices.addTodoList(formData)
      .then((response) => {
        // console.log(response);
        setAddTodoData("");
        getTodoListData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodoListData = (id) => {
    AuthServices.deleteTodoItem(id)
      .then((response) => {
        console.log(response);
        getTodoListData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTodoItemData = (id) => {
    const filteredData = todoData.filter((todo) => todo._id === id);

    const formData = new FormData();
    formData.append("list", filteredData[0].list);

    AuthServices.updateTodoItem(id, formData)
      .then((response) => {
        // console.log(response);
        getTodoListData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getIpAddress = () => {
    AuthServices.getIP().then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getTodoListData();
    getIpAddress();
  }, []);

  return (
    <div className="todo-page-container">
      <h2>Todo Application</h2>
      <div className="todo-add-con" onSubmit={() => {}}>
        <TextField
          // helperText="Please enter your name"
          id="demo-helper-text-misaligned"
          label="Please enter todo list message"
          value={addTodoData}
          onChange={(e) => setAddTodoData(e.target.value)}
        />
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={addTodoListData}
        >
          Add Todo List
        </Button>
      </div>

      <div className="todo-list-item">
        <List>
          {todoData.length > 0 &&
            todoData.map((todo) =>
              todo?.edit ? (
                <ListItem key={todo?._id}>
                  <TextField
                    // helperText="Please enter your name"
                    id="demo-helper-text-misaligned"
                    label="Please enter todo list message"
                    defaultValue={todo?.list}
                    onChange={(e) => todoUpdateData(e.target.value, todo?._id)}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => updateTodoItemData(todo._id)}
                  >
                    Update Todo
                  </Button>
                </ListItem>
              ) : (
                <ListItem
                  key={todo?._id}
                  secondaryAction={
                    <div>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        className="edit-icon-btn"
                        onClick={() => onClickEditTodo(todo?._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        className="delete-icon-btn"
                        onClick={() => deleteTodoListData(todo?._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  }
                >
                  <ListItemText
                    primary={todo?.list}
                    // secondary={secondary ? "Secondary text" : null}
                  />
                </ListItem>
              )
            )}
        </List>
      </div>
    </div>
  );
};

export default TodoPage;
