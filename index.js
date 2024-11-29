import {saveBicicleta, getBicicletas, onGetBicis} from "./firebase.js";

const contentBici = document.getElementById('container-bicicletas');
const bicicletaForm = document.getElementById("bicicleta-form");


window.addEventListener('DOMContentLoaded', async () => {

  onGetBicis((bicicletas) =>{
      
    let contenido = `
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Tipo</th>
            </tr>
        </thead>
        <tbody>
`;

  bicicletas.forEach(bici => {
    let bicicleta = bici.data();

    contenido += `
    <tr>
            <td>${bicicleta.nombre}</td>
            <td>${bicicleta.marca}</td>
            <td>${bicicleta.precio}</td>
            <td>${bicicleta.tipo}</td>
        </tr>
    `
  });

  contenido += `
        </tbody>
    </table>
`;

  contentBici.innerHTML = contenido
    });
});

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

