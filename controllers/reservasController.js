let reservasBD = []; // Arreglo para almacenar las reservas temporalmente

// 1- Crear una nueva reserva
exports.crearReserva = (req, res) => {
  try {
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, num_huespedes } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!hotel || !fecha_inicio || !fecha_fin || !tipo_habitacion || !num_huespedes) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevaReserva = {
      id: reservasBD.length + 1,
      hotel,
      fecha_inicio,
      fecha_fin,
      tipo_habitacion,
      num_huespedes,
      estado: "confirmada",
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
    res.status(200).json(reservasBD);
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

// 6- Filtrar reservas por hotel
exports.filtrarReservasPorHotel = (req, res) => {
  try {
    const { hotel } = req.query;
    const reservasFiltradas = reservasBD.filter(r => r.hotel === hotel);
    res.status(200).json(reservasFiltradas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al filtrar las reservas", error });
  }
};

// 7. Filtrar reservas por rango de fechas
exports.filtrarReservasPorFechas = (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;
    const reservasFiltradas = reservasBD.filter(r => 
      new Date(r.fecha_inicio) >= new Date(fecha_inicio) &&
      new Date(r.fecha_fin) <= new Date(fecha_fin)
    );
    res.status(200).json(reservasFiltradas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al filtrar las reservas", error });
  }
};

// 8- Filtrar reservas por tipo de habitación
exports.filtrarReservasPorTipo = (req, res) => {
  try {
    const { tipo_habitacion } = req.query;
    const reservasFiltradas = reservasBD.filter(r => r.tipo_habitacion === tipo_habitacion);
    res.status(200).json(reservasFiltradas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al filtrar las reservas", error });
  }
};

// 9- Filtrar reservas por estado
exports.filtrarReservasPorEstado = (req, res) => {
  try {
    const { estado } = req.query;
    const reservasFiltradas = reservasBD.filter(r => r.estado === estado);
    res.status(200).json(reservasFiltradas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al filtrar las reservas", error });
  }
};

// 10- Filtrar reservas por número de huéspedes
exports.filtrarReservasPorNumeroHuespedes = (req, res) => {
  try {
    const { num_huespedes } = req.query;
    const reservasFiltradas = reservasBD.filter(r => r.num_huespedes >= num_huespedes);
    res.status(200).json(reservasFiltradas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al filtrar las reservas", error });
  }
};
