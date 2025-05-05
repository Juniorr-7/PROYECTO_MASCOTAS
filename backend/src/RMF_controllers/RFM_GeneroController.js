import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear género
export const crearGenero = async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio.' });
    }

    const genero = await prisma.genero.create({ data: { nombre } });

    res.status(201).json({ mensaje: 'Género creado', genero });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear género.' });
  }
};

// Obtener todos los géneros
export const obtenerGeneros = async (req, res) => {
  try {
    const generos = await prisma.genero.findMany();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener géneros.' });
  }
};

// Obtener género por ID
export const obtenerGeneroPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const genero = await prisma.genero.findUnique({ where: { id } });

    if (!genero) {
      return res.status(404).json({ error: 'Género no encontrado.' });
    }

    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar género.' });
  }
};

// Actualizar género
export const actualizarGenero = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre } = req.body;

    const genero = await prisma.genero.update({
      where: { id },
      data: { nombre },
    });

    res.json({ mensaje: 'Género actualizado', genero });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar género.' });
  }
};

// Eliminar género
export const eliminarGenero = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.genero.delete({ where: { id } });

    res.json({ mensaje: 'Género eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar género.' });
  }
};
