import React from "react";
import logoSofka from "../image/png/logo-sofkau.webp";
const Titulo = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 contenedorimg">
          <img src={logoSofka} />
        </div>
        <div className="col-md-4 titulos">
          <h1>Reto final kata</h1>
          <h2>Front-end 'React'</h2>
          <h2>Back-end 'Springboot'</h2>
        </div>
        <div className="col-md-4 contenedorimg">
          <img src={logoSofka} />
        </div>
      </div>
    </div>
  );
};

export default Titulo;
