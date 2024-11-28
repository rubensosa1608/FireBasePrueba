import {saveBicicleta } from "./firebase.js";

window.addEventListener('DOMContentLoaded', async () => {
    
   // const bicicletas = await getBicicletas();

})


const bicicletaForm = document.getElementById("bicicleta-form");

bicicletaForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const nombre = bicicletaForm["nombre"].value;
    const marca = bicicletaForm["marca"].value;
    const precio = bicicletaForm["precio"].value;
    const tipo = bicicletaForm["tipo"].value;
  
    if (nombre && marca && precio && tipo) {
      await saveBicicleta(nombre, marca, precio, tipo);
      bicicletaForm.reset();
    } else {
      alert("Todos los campos son obligatorios.");
    }
  });

