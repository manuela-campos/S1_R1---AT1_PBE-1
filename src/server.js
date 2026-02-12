import express from 'express';
import produtoRoutes from './routes/produto.routes.js';
import path from 'path';
import 'dotenv/config';
import categoriaRoutes from './routes/categoria.routes.js';

const app = express();

app.use(express.json());
app.use('/', produtoRoutes);
app.use('/', categoriaRoutes);

// rota para ser disponibilizada para fazer dowload
app.use('/images', express.static(path.resolve('uploads/images')));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em https://localhost:${process.env.SERVER_PORT}`);
});