import { Container, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import "./todolist.css";

const ls = localStorage;

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const DataSave = (newTodos) => {
    ls.setItem("test", JSON.stringify(newTodos));
  };

  useEffect(() => {
    if (ls.getItem("test")) {
      setTodos(JSON.parse(ls.getItem("test")));
    }
  }, ["test"]);

  const add = () => {
    if (todo.trim()) {
      let TodoLs = [...todos, { id: Date.now(), todo: todo.trim() }];
      setTodos(TodoLs);
      DataSave(TodoLs);
    }
  };

  const Delete = (id) => {
    let TodoLs = todos.filter((todo) => todo.id !== id);
    DataSave(TodoLs);
    setTodos(TodoLs);
  };

  return (
    <div>
      <Container className="body">
        <h1>ToDoList</h1>
        <Form.Control onChange={(e) => setTodo(e.target.value)} />
        <Button variant="danger" size="lg" onClick={add}>
          {" "}
          Ajouter à la liste{" "}
        </Button>
        {todos.map((todo) => (
          <Container>
            {todo.todo}
            <br />
            <Button variant="danger" size="lg" onClick={() => Delete(todo.id)}>
              supprimer de la liste{" "}
            </Button>
          </Container>
        ))}
      </Container>
    </div>
  );
}
