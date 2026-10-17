import express from 'express';
import cors from 'cors';
// ... demais imports ...
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { AppDataSource } from './data-source';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/Aut
const app = express(); app.use(express.json());
const userController = new UserController();
const authController = new AuthController();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.post('/users', userController.create);
app.get('/users', userController.list); app.post('/login', authController.login);
AppDataSource.initialize().then(() => { app.listen(3000, () => console.log('🚀 Servidor rodando em http://localhost:3000/docs')); });
