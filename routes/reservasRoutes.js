const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

// 1- Crear una nueva reserva
router.post('/reservas', reservasController.crearReserva);

// 2- Obtener lista de reservas (GET /api/reservas)
router.get("/reservas", reservasController.obtenerReservas);

// 3- Obtener reserva por ID (GET /api/reservas/)
router.get("/reservas/:id", reservasController.obtenerReservaPorId);

//4- Actualizar reserva por ID (PUT /api/reservas/)
router.put("/reservas/:id", reservasController.actualizarReserva);

//5- Eliminar reserva por ID (DELETE /api/reservas/)
router.delete("/reservas/:id", reservasController.eliminarReserva);

// 6- Filtrar reservas por hotel (GET /api/reservas?hotel=HOTEL)
router.get("/reservas", reservasController.filtrarReservasPorHotel);

//7- Filtrar reservas por rango de fechas (GET /api/reservas?fecha_inicio=FECHA_INICIO&fecha_fin=FECHA_FIN)
router.get("/reservas", reservasController.filtrarReservasPorFechas);

// 8- Filtrar reservas por tipo de habitación (GET /api/reservas?tipo_habitacion=TIPO_HABITACION)
router.get("/reservas", reservasController.filtrarReservasPorTipo);

//9- Filtrar reservas por estado (GET /api/reservas?estado=ESTADO)
router.get("/reservas", reservasController.filtrarReservasPorEstado);

//10- Filtrar reservas por número de huéspedes (GET /api/reservas?num_huespedes=NUM_HUESPEDES)
router.get("/reservas", reservasController.filtrarReservasPorNumeroHuespedes);


module.exports = router;
