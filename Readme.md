
# Proyecto 4: Reserva Hotelera

# Descripcion: 

Este proyecto es una aplicación de servicios para la gestión de reservas en hoteles que involucra las 4 operaciones CRUD y otras 6 adicionales relacionadas con filtros. Se utilizo Node.js y Express.

Adicionalmente, se realizo un proceso de documentación de la API, usando Swagger, con la estandarización OPENAPI, la cual es utilizada en equipos internacionales para construir servicios escalables.


## Documentation

### Requisitos:
- Node.js: entorno de ejecución
- Express: ramework que permite la creación de aplicaciones web y APIs.
- Nodemon: herramienta que mejora el flujo de desarrollo.
- dotenv:  biblioteca que permite gestionar variables de entorno.
- Swagger: herramienta de documentación interactiva para APIs RESTful.

### Instalación
- Crear archivo  .env para las variables de entorno
- Crear carpeta .gitignore que incluya archivo .env y para ocultar los archivos del repositorio.
- Ejecutar npm install para instalar las dependencias.
- Ejecutar npm run dev para iniciar el servidor.

### Rutas principales para interactuar con la API

    1. POST /api/reservas : Crear una nueva reserva.
    2. GET /api/reservas : Obtener todas las  reservas y con opcion de aplicar filtros opcionales
    3. GET /api/reservas/ : Obtener una reserva por ID.
    4. PUT /api/reservas/ : Actualizar una reserva por ID.
    5. DELETE /api/reservas/ : Eliminar una reserva por ID.

### Instalacion del proyecto
Para instalar y configurar el proyecto en tu maquina local realiza lo siguiente:
```
# Clonar el repositorio
git clone https://github.com/baesmauricio/HOTEL.git

# Entrar en el diractorio del proyecto
cd HOTEL

# Instalar dependencias
npm install
```

### Instrucciones para ejecutar el proyecto
Una vez instaladas las dependencias, puedes ejecutar el servidor con el siguiente comando:
```
# Ejecutar el proyecto en modo desarrollo con nodemon
npm run dev
```
El servidor se levantará en http://localhost:3000, y podrás acceder a la documentación Swagger en http://localhost:3000/api-docs.

### Instrucciones para Cargar la Base de Datos o Migrar los Modelos
- Este proyecto utiliza un simulador de base de datos en memoria, por lo que los datos no son persistentes entre reinicios del servidor.
- Para probar las operaciones CRUD puedes usar herramientas como Postman, curl, o directamente desde Swagger UI en /api-docs.

### Credenciales de Acceso
Este proyecto no incluye autenticación ni credenciales de acceso.


## Feedback
Si tienes alguna duda o si quieres contribuir a mejorar el codigo, por favor no dudes en contactarme.

## Autor
Mauricio Baes Gutierrez

- mabaes.dwfs15@bootcampudd.cl
- baesmauricio@gmail.com


## 🚀 About Me

Mi nombre es Mauricio, kinesiologo intensivista, intelectualmente inquieto y con un profundo interes en mejorar los procesos asistenciales mediante la generacion de nuevo conocimiento. Apasionado por aquellas preguntas de investigacion que son relevantes para la institucion y los pacientes. Estoy convencido de que este Bootcamp UDD en desarrollo web contribuira a mejorar la gestion, los procesos de atencion e inevitablemente la calidad de vida de los pacientes tanto a corto como a largo plazo. Sera una nueva forma de seguir contribuyendo a las salud de las personas. 

