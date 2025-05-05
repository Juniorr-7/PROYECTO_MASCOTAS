import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
const prisma = new PrismaClient();

const SECRET = process.env.JWT_SECRET || 'secreto123'; 

// Iniciar sesión
export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });

    // Buscar usuario por email
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario)
      return res.status(401).json({ error: 'Credenciales inválidas.' });

    // Verificar contraseña
    const match = await bcrypt.compare(password, usuario.password);
    if (!match)
      return res.status(401).json({ error: 'Credenciales inválidas.' });

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, email: usuario.email },
      SECRET,
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el inicio de sesión.' });
  }
};
