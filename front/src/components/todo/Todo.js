import React, { createContext } from "react";
//Importacion de componentes hijos
import Form from "./todoHijos/Form";
import List from "./todoHijos/List";
//importacion de funciones reutilizables
import { StoreProvider } from "./providers/storeReducer";
import video from "../../image/gif/demo.gif";
export const initialState = {
  todo: { list: [], item: {} },
};
export const Store = createContext(initialState);

function Todo() {
  return (
    <StoreProvider>
      <div className="containerform ">
        <div className="row">
          <div className="col-sm-12 col-md-6 divimggif">
            <img src={video} />
          </div>
          <div className="col-sm-12 col-md-6">
            <h3>To-Do List</h3>
            <List Store={Store} />
            <Form Store={Store} />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}

export default Todo;
