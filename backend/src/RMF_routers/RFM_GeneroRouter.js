import { Router } from "express";
import { actualizarGenero, crearGenero, eliminarGenero, obtenerGeneroPorId, obtenerGeneros } from "../RMF_controllers/RFM_GeneroController.js";


export const GeneroRouter = Router();
GeneroRouter.post('/genero', crearGenero);
GeneroRouter.get('/genero', obtenerGeneros);
GeneroRouter.delete('/genero/:id', eliminarGenero);
GeneroRouter.put('/genero/:id', actualizarGenero);
GeneroRouter.get('/genero/:id', obtenerGeneroPorId);
