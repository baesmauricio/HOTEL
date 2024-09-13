// Importamos el modulo Express
const express = require('express');
const dotenv = require('dotenv');
const reservasRoutes = requiere("./routes/reservasRoutes");

// Configurar dotenv para usar las variables de entorno
dotenv.config();

// Creamos una instancia de la aplicación
const app = express();

// Definimos el puerto en el que correrá el servidor
const port = process.env.PORT || 3000;

// Middleware para analizar JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('El Servidor esta corriendo: Bienvenido a la API de Reservas de Hotel');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
