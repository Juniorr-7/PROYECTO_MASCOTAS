import { Router } from "express";
import { iniciarSesion } from "../RMF_controllers/RFM_InicioController.js";


export const iniciarSesionRouter = Router();
iniciarSesionRouter.post('/Sesion', iniciarSesion );
