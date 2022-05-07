import React, { useState } from "react";
import ListTodo from "../components/listTodoList/ListTodo";
import Titulo from "../components/Titulo";
import Todo from "../components/todo/Todo";

const AppKata = () => {
  const [btnTodo, setbtnTodo] = useState(false);
  const [btnListToList, setbtnListToList] = useState(false);
  const [contador, setContador] = useState(0);

  return (
    <>
      <Titulo />
      <div className="containerbtn">
        <div className="row">
          <div className="col-md-12 divbtn">
            <button
              className="btn"
              id="add"
              onClick={() => {
                if (contador === 0) {
                  setbtnTodo(true);
                  setContador(1);
                } else {
                  setbtnTodo(false);
                  setContador(0);
                }
                setbtnListToList(false);
              }}
            >
              Todo
            </button>
            <button
              className="btn"
              id="add"
              onClick={() => {
                if (contador === 0) {
                  setbtnListToList(true);
                  setContador(1);
                } else {
                  setbtnListToList(false);
                  setContador(0);
                }
                setbtnTodo(false);
              }}
            >
              ListToList
            </button>
          </div>
        </div>
      </div>
      {btnTodo ? <Todo /> : <></>}
      {btnListToList ? <ListTodo/> : <></>}
    </>
  );
};

export default AppKata;
