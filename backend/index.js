import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { UsuarioRouter } from './src/RMF_routers/RFM_UsuariosRouter.js';
import { CategoriasRouter }from './src/RMF_routers/RFM_CategoriasRouter.js';
import { RazasRouter } from './src/RMF_routers/RFM_RazaRouter.js';
import { MascotasRouter } from './src/RMF_routers/RFM_MascotasRouter.js';
import { iniciarSesionRouter } from './src/RMF_routers/RFM_InicioRouter.js';
import { GeneroRouter } from './src/RMF_routers/RFM_GeneroRouter.js';
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use(UsuarioRouter)
app.use(CategoriasRouter);
app.use(RazasRouter);
app.use(MascotasRouter);
app.use(iniciarSesionRouter);
app.use(GeneroRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.send(' API de mascotas en funcionamiento.');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
