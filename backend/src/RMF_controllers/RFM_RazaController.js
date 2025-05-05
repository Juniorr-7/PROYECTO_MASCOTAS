import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear raza
export const crearRaza = async (req, res) => {
  try {
    const { nombre, categoriaId } = req.body;

    if (!nombre || !categoriaId) {
      return res.status(400).json({ error: 'Nombre y categoriaId son obligatorios.' });
    }

    const raza = await prisma.raza.create({
      data: { nombre, categoriaId: parseInt(categoriaId) },
    });

    res.status(201).json({ mensaje: 'Raza creada', raza });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear raza.' });
  }
};

// Obtener todas las razas
export const obtenerRazas = async (req, res) => {
  try {
    const razas = await prisma.raza.findMany({
      include: { categoria: true },
    });
    res.json(razas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener razas.' });
  }
};

// Obtener raza por ID
export const obtenerRazaPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const raza = await prisma.raza.findUnique({
      where: { id },
      include: { categoria: true },
    });

    if (!raza) {
      return res.status(404).json({ error: 'Raza no encontrada.' });
    }

    res.json(raza);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar raza.' });
  }
};

// Actualizar raza
export const actualizarRaza = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, categoriaId } = req.body;

    const raza = await prisma.raza.update({
      where: { id },
      data: {
        nombre,
        categoriaId: parseInt(categoriaId),
      },
    });

    res.json({ mensaje: 'Raza actualizada', raza });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar raza.' });
  }
};

// Eliminar raza
export const eliminarRaza = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.raza.delete({ where: { id } });

    res.json({ mensaje: 'Raza eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar raza.' });
  }
};
