import { HOST_API } from "./config/config";

/**
 * Este consumo de api recibe un array de objetos con todas las tareas de la BD,
 *  y setea el estado con al neuva informacion
 * @param {estado: set} setlistaTareas
 */
export function encontrarTareasApi(setlistaTareas) {
  const url = `${HOST_API}/api/todos`;
  fetch(url)
    .then((response) => response.json())
    .then((list) => {
      setlistaTareas(list);
    });
}
/**
 * Este consumo de api recibe un objeto con la tarea a editar
 * @param {Objeto: tarea} tareaSeleccionada
 */

export function editarTareaApi(tareaSeleccionada) {
  const url = `${HOST_API}/api/todo`;
  const params = {
    method: "PUT",
    body: JSON.stringify(tareaSeleccionada),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, params)
    .then((response) => response.json())
    .then((todo) => {});
}

/**
 * Este consumo de api elimina la tarea correspondiente al id recibido como argumento
 * @param {Number} id
 */
export function eliminarTareaApi(id) {
  const url = `${HOST_API}/api/${id}/todo`;
  const params = {
    method: "DELETE",
  };
  fetch(url, params).then((list) => {});
}

/**
 * Este consumo de api recibe un objeto con la tarea a crear
 * @param {Objeto: lista} request
 */
export function crearTareaApi(request) {
  const url = `${HOST_API}/api/todo`;
  const params = {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url, params)
    .then((response) => response.json())
    .then((todo) => {});
}
