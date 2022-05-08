import React, { useState, useEffect } from "react";
//gracias a la dependencia reactstrap podemos crear los modales de uan forma facil
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
} from "reactstrap";
//Iconos para los btn de eliminar y editar
import imgEditar from "../../../image/png/editar.png";
import imgEliminar from "../../../image/png/expediente.png";
//Funciones del consumo de apis
import {
  encontrarTareasApi,
  editarTareaApi,
  eliminarTareaApi,
  crearTareaApi,
} from "../../../api/apiTareas";
import { encontrarListasApi, eliminarlistaApi } from "../../../api/apilistas";

const ListToList = () => {
  //Se actualiza la tarea
  const editar = () => {
    editarTareaApi(tareaSeleccionada);
    setModalEditar(false);
    window.location.reload();
  };

  //Traer las tareas de la base de datos
  const [listaTareas, setlistaTareas] = useState([]);
  const [nombreTarea, setNombreTarea] = useState("");
  useEffect(() => {
    encontrarTareasApi(setlistaTareas);
  }, [encontrarTareasApi]);

  //Traer las listas de la base de datos
  const [listas, setlistas] = useState([]);
  useEffect(() => {
    encontrarListasApi(setlistas);
  }, [encontrarListasApi]);

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

    if (
      request.name === undefined ||
      request.name === null ||
      request.name === ""
    ) {
      console.log("Debes ingresar un nombre");
    } else {
      crearTareaApi(request);
    }
    const myformtarea = document.querySelector("#myformtarea");
    myformtarea.reset();
  };

  //Eliminar lista
  const eliminarLista = (id) => {
    eliminarlistaApi(id);
    window.location.reload();
  };

  //Eliminar tarea
  const eliminar = (id) => {
    eliminarTareaApi(id);
    window.location.reload();
  };

  //Actualizar tarea
  const onChange = (event, tarea, id, nombreLista) => {
    const request = {
      name: tarea.name,
      id: tarea.id,
      completed: event.target.checked,
      listTodo: {
        id: id,
        name: nombreLista,
      },
    };
    editarTareaApi(request);
    window.location.reload();
  };

  //Estados para los modales
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState({
    id: "",
    name: "",
    completed: false,
    listTodo: {
      id: "",
      name: "",
    },
  });

  //Funciones para los modales
  const seleccionarTarea = (tarea, caso) => {
    setTareaSeleccionada(tarea);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  //handle para el modal de editar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTareaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle tarea
  const handleSubmitNombreTarea = (e) => {
    setNombreTarea(e.target.value);
  };

  return (
    <>
      <div className="containerlistasren">
        {/* la logica es recorrer primero el array de objetos de las listas y luego el
         array de tareas y filtrar las tareas correspondiente a la lista de la posicion de la iteracion*/}
        <div className="row">
          {listas.map((lista, index) => {
            return (
              <div key={index} className="col-6 divlistaren titulos">
                <div className="containernombrelista">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="titulolista">{lista.name}</h1>
                      <button
                        className="btneliminarlista"
                        onClick={() => eliminarLista(lista.id)}
                      >
                        Eliminar lista
                      </button>
                    </div>

                    <div className="col-12 divformtareas">
                      <form id="myformlista">
                        <input
                          id="nombretarea"
                          placeholder="Ingresar nombre de tarea"
                          onChange={handleSubmitNombreTarea}
                        />
                        <button
                          className="btncreartarea"
                          id="btntarea"
                          onClick={() => crearTarea(lista.id, lista.name)}
                        >
                          Crear
                        </button>
                      </form>
                    </div>
                    <div className="col-12">
                      <table className="table table-striped tabletareas">
                        <thead>
                          <tr>
                            <td>ID</td>
                            <td>Tarea</td>
                            <td>¿Completado?</td>
                            <td>
                              <img src={imgEditar} className="imgeditar" />
                            </td>
                            <td>
                              <img src={imgEliminar} className="imgeditar" />
                            </td>
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

                                  <td>
                                    <input
                                      type="checkbox"
                                      defaultChecked={tarea.completed}
                                      onChange={(event) =>
                                        onChange(event, tarea, id, lista.name)
                                      }
                                    ></input>
                                  </td>

                                  <td>
                                    <button
                                      className="btneditartarea"
                                      onClick={() =>
                                        seleccionarTarea(tarea, "Editar")
                                      }
                                    >
                                      Editar
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      className="btneliminartarea"
                                      onClick={() =>
                                        seleccionarTarea(tarea, "Eliminar")
                                      }
                                    >
                                      Eliminar
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Se implementa el modal para editar las tareas */}
          <Modal isOpen={modalEditar}>
            <ModalHeader>
              <div>
                <h3>Editar tarea</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>ID</label>
                <input
                  className="form-control"
                  name="id"
                  readOnly
                  type="text"
                  value={tareaSeleccionada && tareaSeleccionada.id}
                />
              </FormGroup>
              <FormGroup>
                <label>Nombre</label>
                <input
                  className="form-control"
                  name="name"
                  type="text"
                  value={tareaSeleccionada && tareaSeleccionada.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>completada</label>
                <input
                  className="form-control"
                  name="completada"
                  readOnly
                  type="text"
                  value={tareaSeleccionada && tareaSeleccionada.completed}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>id lista</label>
                <input
                  className="form-control"
                  name="id"
                  readOnly
                  type="text"
                  value={tareaSeleccionada && tareaSeleccionada.listTodo.id}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Nombre de lista</label>
                <input
                  className="form-control"
                  name="name"
                  readOnly
                  type="text"
                  value={tareaSeleccionada && tareaSeleccionada.listTodo.name}
                  onChange={handleChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button onClick={editar} color="primary">
                Editar
              </Button>
              <Button
                onClick={() => {
                  setModalEditar(false);
                }}
                color="danger"
              >
                Salir
              </Button>
            </ModalFooter>
          </Modal>
          {/* Se implementa el modal para eliminar las tareas */}

          <Modal isOpen={modalEliminar}>
            <ModalHeader>
              <div>
                <h3>Estas seguro de Eliminar la tarea: </h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <h2 className="tareaeliminar">{tareaSeleccionada.name}</h2>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => eliminar(tareaSeleccionada.id)}
                className="btnmodaleliminar"
              >
                ELiminar
              </Button>

              <Button
                className="btnmodaleliminar"
                onClick={() => {
                  setModalEliminar(false);
                }}
                color="danger"
              >
                Salir
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ListToList;
