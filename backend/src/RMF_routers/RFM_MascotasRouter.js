import { Router } from "express";
import { actualizarMascota, crearMascota, eliminarMascota, obtenerMascotaPorId, obtenerMascotas } from "../RMF_controllers/RFM_MascotasController.js";


export const MascotasRouter = Router();
MascotasRouter.post('/mascota', crearMascota);
MascotasRouter.get('/mascota', obtenerMascotas);
MascotasRouter.delete('/mascota/:id', eliminarMascota);
MascotasRouter.put('/mascota/:id', actualizarMascota);
MascotasRouter.get('/mascota/:id', obtenerMascotaPorId);
