import {HOST_API } from  "./config/config"

/**
 * Este consumo de api nos devuelve todas las listas que hay en BD, y me setea un 
 * estado con el nuevo array encontrado
 * @param {Recibe el set del estado listas} setListas 
 */
export function encontrarListasApi(setListas) {
    const url = `${HOST_API}/api/list/listtodos`;
    fetch(url)
      .then((response) => response.json())
      .then((list) => {
        setListas(list);
      });

} 

/**
 * Este consumo de api elimina la lista que corresponde al id que recibe como argumento
 * @param {Number: id} id 
 */
export function eliminarlistaApi(id) {
    const url = `${HOST_API}/api/list/${id}`;
    const params = {
      method: "DELETE",
    };
    fetch(url, params).then((list) => {});
  }

/**
 * Este consumo de api recibe un objeto con la lista a crear
 * @param {Objeto: lista} request
 * @param {estado: set} setListaId
 */
  export function crearListaApi(request,setListaId) {
    const url = `${HOST_API}/api/list/listtodo`;
    const params = {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }
    fetch(url, params)
      .then((response) => response.json())
      .then((todo) => {
        setListaId(todo.id);
      });
  }
  
