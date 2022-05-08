import AppKata from "../pages/AppKata";

//Array de ruta para el app kata, en este caso todo va a correr solo en un componente 
//y tendra de ruta app-kata en la url
const rutasTareas = [
  {
    patch: "/app-kata",
    component: AppKata,
  },
];

const rutas = [...rutasTareas];

export default rutas;
