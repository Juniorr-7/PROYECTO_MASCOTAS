import { PrismaClient }from '@prisma/client';
const prisma = new PrismaClient();
import path from 'path';
import fs from 'fs';


export const crearMascota = async (req, res) => {
  try {
    const { nombre, edad, descripcion, razaId, categoriaId, generoId } = req.body;
    const imagen = req.file?.filename;

    if (!nombre || !edad || !descripcion || !razaId || !categoriaId || !generoId || !imagen) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const mascota = await prisma.mascota.create({
      data: {
        nombre,
        edad: parseInt(edad),
        descripcion,
        imagen,
        razaId: parseInt(razaId),
        categoriaId: parseInt(categoriaId),
        generoId: parseInt(generoId),
      },
    });

    res.status(201).json(mascota);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear mascota.' });
  }
};

// Listar todas las mascotas
export const obtenerMascotas = async (req, res) => {
  try {
    const mascotas = await prisma.mascota.findMany({
      include: {
        raza: true,
        categoria: true,
        genero: true,
      },
    });
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mascotas.' });
  }
};

// Obtener mascota por ID
export const obtenerMascotaPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const mascota = await prisma.mascota.findUnique({
      where: { id },
      include: {
        raza: true,
        categoria: true,
        genero: true,
      },
    });
    if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada.' });
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar mascota.' });
  }
};

// Actualizar mascota
export const actualizarMascota = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, edad, descripcion, razaId, categoriaId, generoId } = req.body;
    const imagen = req.file?.filename;

    const data = {
      nombre,
      edad: parseInt(edad),
      descripcion,
      razaId: parseInt(razaId),
      categoriaId: parseInt(categoriaId),
      generoId: parseInt(generoId),
    };

    if (imagen) data.imagen = imagen;

    const mascotaActualizada = await prisma.mascota.update({
      where: { id },
      data,
    });

    res.json(mascotaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar mascota.' });
  }
};

// Eliminar mascota
export const eliminarMascota = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const mascota = await prisma.mascota.findUnique({ where: { id } });

    if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada.' });

    await prisma.mascota.delete({ where: { id } });

    // Eliminar imagen del servidor
    const imagenPath = path.join(__dirname, '..', 'public', 'img', mascota.imagen);
    if (fs.existsSync(imagenPath)) fs.unlinkSync(imagenPath);

    res.json({ mensaje: 'Mascota eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar mascota.' });
  }
};
