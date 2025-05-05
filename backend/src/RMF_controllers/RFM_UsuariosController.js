import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

// Crear usuario (registro)
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password)
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });

    // Verificar si el email ya está en uso
    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe)
      return res.status(409).json({ error: 'El email ya está registrado.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ mensaje: 'Usuario creado con éxito', usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario.' });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: { id: true, nombre: true, email: true },
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
};

// Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: { id: true, nombre: true, email: true },
    });

    if (!usuario)
      return res.status(404).json({ error: 'Usuario no encontrado.' });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar usuario.' });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, email, password } = req.body;

    const data = {
      nombre,
      email,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const usuario = await prisma.usuario.update({
      where: { id },
      data,
      select: { id: true, nombre: true, email: true },
    });

    res.json({ mensaje: 'Usuario actualizado', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario.' });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.usuario.delete({ where: { id } });

    res.json({ mensaje: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario.' });
  }
};
