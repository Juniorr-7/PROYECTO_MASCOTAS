import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear una categoría
export const crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio.' });
    }

    const existente = await prisma.categoria.findUnique({ where: { nombre } });
    if (existente) {
      return res.status(409).json({ error: 'La categoría ya existe.' });
    }

    const categoria = await prisma.categoria.create({ data: { nombre } });

    res.status(201).json({ mensaje: 'Categoría creada', categoria });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear categoría.' });
  }
};

// Listar todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías.' });
  }
};

// Obtener una categoría por ID
export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const categoria = await prisma.categoria.findUnique({ where: { id } });

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría.' });
  }
};

// Actualizar una categoría
export const actualizarCategoria = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre } = req.body;

    const categoria = await prisma.categoria.update({
      where: { id },
      data: { nombre },
    });

    res.json({ mensaje: 'Categoría actualizada', categoria });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría.' });
  }
};

// Eliminar una categoría
export const eliminarCategoria = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.categoria.delete({ where: { id } });

    res.json({ mensaje: 'Categoría eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría.' });
  }
};
