// Importamos los módulos necesarios
const express = require('express'); // Framework para crear aplicaciones web
const dotenv = require('dotenv'); // Módulo para gestionar variables de entorno
const reservasRoutes = require("./routes/reservasRoutes"); // Archivo que contiene las rutas de las reservas

// Configuramos dotenv para poder usar las variables de entorno desde el archivo .env
dotenv.config();

// Importamos Swagger para la documentación de la API
const swaggerJsDoc = require('swagger-jsdoc'); // Genera la documentación Swagger en formato OpenAPI
const swaggerUi = require('swagger-ui-express'); // Sirve la documentación de Swagger en formato de UI visual

// Creamos una instancia de la aplicación
const app = express(); // Inicialización de la aplicación antes de su uso

// Configuramos Swagger con las opciones necesarias
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Reservas de Hoteles", // Título de la API
      version: "1.0.0",
      description: "API que gestiona las reservas en hoteles",
      contact: {
        name: "Baesmauricio", // Información del desarrollador o responsable de la API

      },
    },
    servers: [
      {
        url: "http://localhost:3000/api", // URL base del servidor en donde se ejecuta la API
      },
    ],
  },
  apis: ["./routes/*.js"], // Ubicación de los archivos donde se encuentran las rutas documentadas
};

// Generamos la documentación de Swagger a partir de las opciones configuradas
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware para servir la documentación de Swagger en la ruta /api-docs

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Definimos el puerto en el que correrá el servidor
const port = process.env.PORT || 3000;

// Middleware para analizar JSON en las solicitudes (req.body)
app.use(express.json()); // Habilita el análisis de datos JSON en las solicitudes

// Usar las rutas de reservas desde el archivo 'reservasRoutes'
app.use('/api/reservas', reservasRoutes);

// Definimos una ruta de prueba para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('El Servidor esta corriendo: Bienvenido a la API de Reservas de Hotel');
});

// Iniciamos el servidor y mostramos un mensaje en la consola cuando está corriendo
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

