import { Router } from "express";
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoriaPorId, obtenerCategorias } from "../RMF_controllers/RFM_CategoriasController.js";



export const CategoriasRouter = Router();
CategoriasRouter.post('/Categoria', crearCategoria);
CategoriasRouter.get('/Categoria', obtenerCategorias);
CategoriasRouter.delete('/Categoria/:id', eliminarCategoria);
CategoriasRouter.put('/Categoria/:id', actualizarCategoria);
CategoriasRouter.get('/Categoria/:id', obtenerCategoriaPorId);