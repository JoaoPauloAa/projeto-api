import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
export class UserController { async create(req: Request, res: Response): Promise<Response> { const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    const userRepository = AppDataSource.getRepository(User);
    const userExists = await userRepository.findOneBy({ email });
    if (userExists) return res.status(400).json({ message: 'E-mail já cadastrado' }); const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = userRepository.create({ name, email, password: hashedPassword });
    await userRepository.save(newUser);
    return res.status(201).json({ id: new User.id, name: newUser.name, email: newUser.email });} async list(req: Request, res: Response): Promise<Response> { const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({ select: ['id', 'name', 'email', 'createdAt'] });
    return res.status(200).json(users);
  }
 }