// Arreglo para almacenar las reservas temporalmente.
// Simula una base de datos en memoria que contiene un conjunto de reservas de ejemplo.
// let reservasBD = [
//   {
//   id: 1,
//   hotel: "Tompson",
//   tipo: "Doble",
//   num_huespedes: 2,
//   fechaEntrada: "2024-09-08",
//   fechaSalida: "2024-09-12",
//   estado: "Disponible",
//   precio: 400,
// },
// {
//   id: 2,
//   hotel: "American",
//   tipo: "Cuadruple",
//   num_huespedes: 4,
//   fechaEntrada: "2024-09-10",
//   fechaSalida: "2024-09-20",
//   estado: "Disponible",
//   precio: 400,
// },
// {
//   id: 3,
//   hotel: "Luxury",
//   tipo: "Triple",
//   num_huespedes: 4,
//   fechaEntrada: "2024-09-18",
//   fechaSalida: "2024-09-28",
//   estado: "Disponible",
//   precio: 400,
// },
// {
//   id: 4,
//   hotel: "Sheraton",
//   tipo: "Triple",
//   num_huespedes: 3,
//   fechaEntrada: "2024-09-08",
//   fechaSalida: "2024-09-12",
//   estado: "Disponible",
//   precio: 400,
// },];



// Importa el módulo de modelo de reserva desde el archivo reservaModel en el directorio 'models'
const reservasBD = require("../models/reservaModel");

// 1- Crear una nueva reserva
// Esta función crea una nueva reserva en la base de datos temporal (reservasBD).
exports.crearReserva = (req, res) => {
  try {
    // Extraemos los datos de la reserva del cuerpo de la solicitud.
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, num_huespedes, estado } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!hotel || !fecha_inicio || !fecha_fin || !tipo_habitacion || !num_huespedes || !estado) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    // Creamos un nuevo objeto de reserva.
    const nuevaReserva = {
      id: reservasBD.length + 1, // Genera un nuevo ID de forma secuencial
      hotel,
      fecha_inicio,
      fecha_fin,
      tipo_habitacion,
      num_huespedes,
      estado,
    };

    reservasBD.push(nuevaReserva);
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la reserva" });
  }
}; 

// 2- Obtener todas las reservas
// Esta función devuelve una lista de reservas filtradas por los parámetros de búsqueda (query parameters).
exports.obtenerReservas = (req, res) => {
  try {
   // Extraemos los filtros de la solicitud
  const { nombreHotel, num_huespedes, estado, tipo, fechaEntrada, fechaSalida } = req.query;

  // Copiamos el arreglo de reservas para comenzar a aplicar los filtros.
  let reservasFiltradas = reservasBD;
 
  // Aplicamos filtros opcionales si se proporcionan en la solicitud.
  if (nombreHotel) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.hotel.toLowerCase() === nombreHotel.toLowerCase()
    );
  }
 
  if (num_huespedes) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.num_huespedes === parseInt(num_huespedes)
    );
  }
 
  if (estado) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.estado.toLowerCase() === estado.toLowerCase()
    );
  }
 
  if (tipo) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.tipo.toLowerCase() === tipo.toLowerCase()
    );
  }
  // Filtramos por rango de fechas si se proporcionan ambos parámetros.
  if (fechaEntrada && fechaSalida) {
    const entrada = new Date(fechaEntrada);
      const salida = new Date(fechaSalida);

    reservasFiltradas = reservasFiltradas.filter((r) => {
      const reservaEntrada = new Date(r.fechaEntrada);
        const reservaSalida = new Date(r.fechaSalida);
        return (
          (reservaEntrada >= entrada && reservaSalida <= salida) || // Reserva completamente dentro del rango
          (reservaEntrada <= salida && reservaSalida >= entrada) // Reserva que se solapa con el rango
        );
      });
    } 
      
  // Si no se encuentran reservas con los filtros proporcionados, se devuelve un error 404.
  if (reservasFiltradas.length === 0) {
    return res.status(404).json({ error: "No se encontraron reservaciones con los criterios dados." });
  }
  // Respondemos con las reservas filtradas.
  res.json({
    msg: "Reservaciones obtenidas con éxito.",
    data: reservasFiltradas,
  });
    
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las reservas", error });
  }
};

// 3- Obtener una reserva por ID
// Esta función devuelve una reserva específica según el ID proporcionado en los parámetros de la URL.
exports.obtenerReservaPorId = (req, res) => {
  try {
    const { id } = req.params; // Extraemos el ID de los parámetros de la URL
    const reserva = reservasBD.find(r => r.id == id); // Buscamos la reserva por ID.
    
    // Si se encuentra la reserva, se envía en la respuesta; de lo contrario, se devuelve un error 404.
    if (reserva) {
      res.status(200).json(reserva);
    } else {
      res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la reserva", error });
  }
};

// 4- Actualizar una reserva por ID
// Esta función actualiza los datos de una reserva específica según el ID proporcionado en los parámetros.
exports.actualizarReserva = (req, res) => {
  try {
    const { id } = req.params; // Extraemos el ID de los parámetros de la URL
    const { fechaEntrada, fechaSalida, tipoHabitacion, numAdultos, numNinos } = req.body; // Extraemos los datos del cuerpo de la solicitud.
    const reservaIndex = reservasBD.findIndex(r => r.id == id);     // Buscamos el índice de la reserva en el arreglo por su ID.


    // Si se encuentra la reserva, se actualiza; de lo contrario, se devuelve un error 404.
    if (reservaIndex !== -1) {
      reservasBD[reservaIndex] = { 
        ...reservasBD[reservaIndex], 
        fechaEntrada, 
        fechaSalida, 
        tipoHabitacion, 
        numAdultos, 
        numNinos 
      };
      res.status(200).json({ mensaje: "Reserva actualizada", reserva: reservasBD[reservaIndex] });
    } else {
      res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la reserva", error });
  }
};

// 5- Eliminar una reserva por ID
// Esta función elimina una reserva específica según el ID proporcionado en los parámetros.
exports.eliminarReserva = (req, res) => {
  try {
    const { id } = req.params; // Extraemos el ID de los parámetros de la URL
    const reservaIndex = reservasBD.findIndex(r => r.id == id); // Buscamos el índice de la reserva en el arreglo por su ID.
    
    // Si se encuentra la reserva, se elimina; de lo contrario, se devuelve un error 404.
    if (reservaIndex !== -1) {
      reservasBD.splice(reservaIndex, 1); // Eliminamos la reserva del arreglo.
      res.status(200).json({ mensaje: "Reserva eliminada correctamente" });
    } else {
      res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la reserva", error });
  }
};
