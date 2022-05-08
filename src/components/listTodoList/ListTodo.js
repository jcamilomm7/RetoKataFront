import React, { useState } from "react";
//Se importan el componente hijo que se utilizara aca
import ListToList from "./listToListHijos/ListToList";
//Se importa la funcion del consumo del api de crear lista
import { crearListaApi } from "../../api/apilistas";

const ListTodo = () => {
  const [nombreLista, setNombreLista] = useState("");
  const [listaId, setListaId] = useState(0);

  //Obtener value actual del nombre
  const handleSubmitNombreLista = (e) => {
    setNombreLista(e.target.value);
  };

  const crearLista = (event) => {
    const request = {
      name: nombreLista,
      id: null,
    };

    if (
      request.name === undefined ||
      request.name === null ||
      request.name === ""
    ) {
      event.preventDefault();
      console.log("Debes ingresar un nombre");
    } else {
      //Aca nos conectamos con el api
      crearListaApi(request, setListaId);
    }
    const myForm = document.querySelector("#myform");
    myForm.reset();
  };

  return (
    <>
      <div className="divcrearlista">
        <form id="myform">
          <input
            id="nombrelista"
            placeholder="Ingresar nombre lista"
            onChange={handleSubmitNombreLista}
          />
          <button id="btnlista" onClick={crearLista}>
            Crear
          </button>
        </form>
      </div>
      <ListToList />
    </>
  );
};

export default ListTodo;
