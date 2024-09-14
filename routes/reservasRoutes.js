const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

// 1- Crear una nueva reserva
router.post('/', reservasController.crearReserva);

// 2- Obtener lista de reservas (GET /api)
router.get("/", reservasController.obtenerReservas);

// 3- Obtener reserva por ID (GET /api/)
router.get("/:id", reservasController.obtenerReservaPorId);

//4- Actualizar reserva por ID (PUT /api/)
router.put("/:id", reservasController.actualizarReserva);

//5- Eliminar reserva por ID (DELETE /api/)
router.delete("/:id", reservasController.eliminarReserva);



module.exports = router;
