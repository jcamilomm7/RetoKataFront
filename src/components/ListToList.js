import React, { useState, useEffect } from "react";

const ListToList = () => {
  //Traer las tareas de la base de datos
  const [listaTareas, setlistaTareas] = useState([]);
  const [nombreTarea, setNombreTarea] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/api/todos")
      .then((response) => response.json())
      .then((list) => {
        setlistaTareas(list);
      });
  }, []);

  //Traer las listas de la base de datos
  const [listas, setlistas] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/list/listtodos")
      .then((response) => response.json())
      .then((list) => {
        setlistas(list);
      });
  }, []);

  //hundle tarea
  const handleSubmitNombreTarea = (e) => {
    setNombreTarea(e.target.value);
  };

  //Crear tarea
  const crearTarea = (id, nombreLista) => {
    /* event.preventDefault(); */
    const request = {
      name: nombreTarea,
      id: null,
      completed: false,
      listTodo: {
        id: id,
        name: nombreLista,
      },
    };
    console.log(typeof request.name);

    if (
      request.name === undefined ||
      request.name === null ||
      request.name === ""
    ) {
      console.log("Debes ingresar un nombre");
    } else {
      fetch("http://localhost:8080/api/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((todo) => {
          
        });
    }
    const myformtarea = document.querySelector("#myformtarea");
    myformtarea.reset();
  };

  //Eliminar lista
  const eliminarLista = (id) => {
    fetch(`http://localhost:8080/api/list/${id}`, {
      method: "DELETE",
    }).then((list) => {});
    window.location.reload();
  };
  console.log(listaTareas);
  console.log(listas);

  return (
    <>
      {listas.map((lista, index) => {
        return (
          <div key={index}>
            <h1>{lista.name}</h1>
            <button onClick={() => eliminarLista(lista.id)}>
              Eliminar lista
            </button>
            <form id="myformlista">
              <input
                id="nombretarea"
                placeholder="Ingresar nombre de tarea"
                onChange={handleSubmitNombreTarea}
              />
              <button
                id="btntarea"
                onClick={() => crearTarea(lista.id, lista.name)}
              >
                Crear
              </button>
            </form>
            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Tarea</td>
                  <td>¿Completado?</td>
                </tr>
              </thead>
              <tbody>
                {listaTareas.map((tarea, index) => {
                  const { id, name } = tarea.listTodo;
                  if (lista.id === id) {
                    return (
                      <tr key={index}>
                        <td>{tarea.id}</td>
                        <td>{tarea.name}</td>
                        <td>{tarea.completed}</td>

                        <td>
                          <button>Editar</button>
                          <button>Eliminar</button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
};

export default ListToList;
