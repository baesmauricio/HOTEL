// Importamos el modulo Express
const express = require('express');
const dotenv = require('dotenv');
const reservasRoutes = require("./routes/reservasRoutes");

// Configurar dotenv para usar las variables de entorno
dotenv.config();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Creamos una instancia de la aplicación
const app = express(); // Inicialización de la aplicación antes de su uso

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Reservas de Hoteles",
      version: "1.0.0",
      description: "API que gestiona las reservas en hoteles",
      contact: {
        name: "Baesmauricio",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api", 
      },
    ],
  },
  apis: ["./routes/*.js"], 
};
// Middleware para servir la documentación de Swagger en la ruta /api-docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// Definimos el puerto en el que correrá el servidor
const port = process.env.PORT || 3000;

// Middleware para analizar JSON
app.use(express.json());

// Usar las rutas de reservas
app.use('/api/reservas', reservasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('El Servidor esta corriendo: Bienvenido a la API de Reservas de Hotel');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

//npm run dev
//http://localhost:3000/api/reservas
//comprobrar con postman
//  "hotel": "Piedra del Lobo",
//  "fecha_inicio": "2024-09-01",
//  "fecha_fin": "2024-09-10",
//  "tipo_habitacion": "doble",
//  "num_huespedes": 2
//  " estado": "confirmado"
//}
