
import ListTodo from "../pages/ListTodo";
import Todo from "../pages/Todo"

const routesUser= [
    {
      patch: "/todo",   
      component: Todo,  
    },
    {
      patch: "/listtodo",  
      component: ListTodo,  
    },
   
  ];


  const routes = [...routesUser]

  export default routes;