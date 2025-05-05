import { Router } from "express";
import { actualizarUsuario, crearUsuario, eliminarUsuario, obtenerUsuarioPorId, obtenerUsuarios } from "../RMF_controllers/RFM_UsuariosController.js";


export const UsuarioRouter = Router();
UsuarioRouter.post('/usuarios', crearUsuario );
UsuarioRouter.get('/usuarios', obtenerUsuarios);
UsuarioRouter.delete('/usuarios/:id', eliminarUsuario);
UsuarioRouter.put('/usuarios/:id', actualizarUsuario);
UsuarioRouter.get('/asuarios/:id', obtenerUsuarioPorId);