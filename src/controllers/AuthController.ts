import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt
from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User'; export class AuthController { async login(req: Request, res: Response):
Promise<Response> { const { email, password } = req.body; const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) { return res.status(401).json({ message:
'Credenciais inválidas' }); }
    const token = jwt.sign({ id: user.id }, 'CHAVE_SECRETA_JWT', {expiresIn: '1h' });
    return res.status(200).json({ message: 'Autenticado com sucesso', token}); } }