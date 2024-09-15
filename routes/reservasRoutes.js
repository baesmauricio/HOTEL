const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

// 1- Ruta: Crear una nueva reserva
router.post('/', reservasController.crearReserva);

// 1.1 - Documentacion "Crear una nueva reserva "
/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservaInput'
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Error en los campos obligatorios
 *       500:
 *         description: Error interno al procesar la reserva
 */
/** esquema de la respuesta
 * 
 * @swagger
 * components:
 *   schemas:
 *     Reserva:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         hotel:
 *           type: string
 *           example: "Tompson"
 *         tipo:
 *           type: string
 *           example: "Doble"
 *         num_huespedes:
 *           type: integer
 *           example: 2
 *         fechaEntrada:
 *           type: string
 *           format: date
 *           example: "2024-09-08"
 *         fechaSalida:
 *           type: string
 *           format: date
 *           example: "2024-09-12"
 *         estado:
 *           type: string
 *           example: "Disponible"
 *         precio:
 *           type: number
 *           example: 400
 *
 *     ReservaInput:
 *       type: object
 *       properties:
 *         hotel:
 *           type: string
 *         fecha_inicio:
 *           type: string
 *           format: date
 *         fecha_fin:
 *           type: string
 *           format: date
 *         tipo_habitacion:
 *           type: string
 *         num_huespedes:
 *           type: integer
 *         estado:
 *           type: string
 */

// 2- Ruta: Obtener lista de reservas (GET /api)
router.get("/", reservasController.obtenerReservas);

// 2.1 - Documentacion "Obtener lista de reservas "
/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener todas las reservas con filtros opcionales
 *     tags: [Reservas]
 *     parameters:
 *       - in: query
 *         name: nombreHotel
 *         schema:
 *           type: string
 *         description: Nombre del hotel
 *       - in: query
 *         name: num_huespedes
 *         schema:
 *           type: integer
 *         description: Número de huéspedes
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *         description: Estado de la reserva
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: Tipo de habitación
 *       - in: query
 *         name: fechaEntrada
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de entrada
 *       - in: query
 *         name: fechaSalida
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de salida
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reserva'
 *       404:
 *         description: No se encontraron reservas con los criterios dados
 *       500:
 *         description: Error al obtener las reservas
 */


// 3- Ruta: Obtener reserva por ID (GET /api/)
router.get("/:id", reservasController.obtenerReservaPorId);

// 3.1 - Documentacion " Obtener reserva por ID "
/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserva'
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al obtener la reserva
 */

// 4- Ruta: Actualizar reserva por ID (PUT /api/)
router.put("/:id", reservasController.actualizarReserva);

// 4.1 - Documentacion " Actualizar reserva por ID "
/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservaInput'
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al actualizar la reserva
 */


// 5- Ruta: Eliminar reserva por ID (DELETE /api/)
router.delete("/:id", reservasController.eliminarReserva);

// 5.1 - Documentacion "Eliminar reserva por ID"
/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error al eliminar la reserva
 */




module.exports = router;
