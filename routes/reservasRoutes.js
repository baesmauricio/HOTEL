const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

// Crear una nueva reserva
router.post('/reservas', reservasController.crearReserva);

module.exports = router;
