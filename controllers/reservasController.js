// Arreglo para almacenar las reservas temporalmente
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
  hotel: "Sheraton",
  tipo: "Triple",
  num_huespedes: 3,
  fechaEntrada: "2024-09-08",
  fechaSalida: "2024-09-12",
  estado: "Disponible",
  precio: 400,
},]; 

// 1- Crear una nueva reserva
exports.crearReserva = (req, res) => {
  try {
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, num_huespedes, estado } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!hotel || !fecha_inicio || !fecha_fin || !tipo_habitacion || !num_huespedes || !estado) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevaReserva = {
      id: reservasBD.length + 1,
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
exports.obtenerReservas = (req, res) => {
  try {
    const { nombreHotel, num_huespedes, estado, tipo, fechaEntrada, fechaSalida } = req.query;
 
  let reservasFiltradas = reservasBD;
 
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
 
  if (fechaEntrada && fechaSalida) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.fechaEntrada >= fechaEntrada && r.fechaSalida <= fechaSalida
    );
  }
 
  if (reservasFiltradas.length === 0) {
    return res.status(404).json({ error: "No se encontraron reservaciones con los criterios dados." });
  }
 
  res.json({
    msg: "Reservaciones obtenidas con éxito.",
    data: reservasFiltradas,
  });
    
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las reservas", error });
  }
};

// 3- Obtener una reserva por ID
exports.obtenerReservaPorId = (req, res) => {
  try {
    const { id } = req.params;
    const reserva = reservasBD.find(r => r.id == id);
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
exports.actualizarReserva = (req, res) => {
  try {
    const { id } = req.params;
    const { fechaEntrada, fechaSalida, tipoHabitacion, numAdultos, numNinos } = req.body;
    const reservaIndex = reservasBD.findIndex(r => r.id == id);

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
exports.eliminarReserva = (req, res) => {
  try {
    const { id } = req.params;
    const reservaIndex = reservasBD.findIndex(r => r.id == id);

    if (reservaIndex !== -1) {
      reservasBD.splice(reservaIndex, 1);
      res.status(200).json({ mensaje: "Reserva eliminada correctamente" });
    } else {
      res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la reserva", error });
  }
};
