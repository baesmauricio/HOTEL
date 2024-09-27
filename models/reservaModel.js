//Arreglo para almacenar las reservas temporalmente.
//Simula una base de datos en memoria que contiene un conjunto de reservas de ejemplo.
let reservasBD = [
    {
    id: 1,
    hotel: "Tompson",
    tipo: "Doble",
    num_huespedes: 2,
    fechaEntrada: "2024-09-08",
    fechaSalida: "2024-09-12",
    estado: "Disponible",
    precio: 400,
  },
  {
    id: 2,
    hotel: "American",
    tipo: "Cuadruple",
    num_huespedes: 4,
    fechaEntrada: "2024-09-10",
    fechaSalida: "2024-09-20",
    estado: "Disponible",
    precio: 400,
  },
  {
    id: 3,
    hotel: "Luxury",
    tipo: "Triple",
    num_huespedes: 4,
    fechaEntrada: "2024-09-18",
    fechaSalida: "2024-09-28",
    estado: "Disponible",
    precio: 400,
  },
  {
    id: 4,
    hotel: "Sheraton",
    tipo: "Triple",
    num_huespedes: 3,
    fechaEntrada: "2024-09-08",
    fechaSalida: "2024-09-12",
    estado: "Disponible",
    precio: 400,
  },]; 
  
  module.exports = reservasBD;