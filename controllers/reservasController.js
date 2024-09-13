let reservas = []; // Arreglo para almacenar las reservas temporalmente

// Crear una nueva reserva
exports.crearReserva = (req, res) => {
  try {
    const { hotel, fecha_inicio, fecha_fin, tipo_habitacion, num_huespedes } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!hotel || !fecha_inicio || !fecha_fin || !tipo_habitacion || !num_huespedes) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevaReserva = {
      id: reservas.length + 1,
      hotel,
      fecha_inicio,
      fecha_fin,
      tipo_habitacion,
      num_huespedes,
      estado: "confirmada",
    };

    reservas.push(nuevaReserva);
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ error: "Error al procesar la reserva" });
  }
};
