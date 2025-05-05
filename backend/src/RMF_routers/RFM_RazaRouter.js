import { Router } from "express";
import { actualizarRaza, crearRaza, eliminarRaza, obtenerRazaPorId, obtenerRazas } from "../RMF_controllers/RFM_RazaController.js";


export const RazasRouter = Router();
RazasRouter.post('/raza', crearRaza);
RazasRouter.get('/raza', obtenerRazas);
RazasRouter.delete('/raza/:id', eliminarRaza);
RazasRouter.put('/raza/:id', actualizarRaza);
RazasRouter.get('/raza/:id', obtenerRazaPorId);
