// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

const app = express();

// Middleware para ler JSON
app.use(express.json());

// Rotas
app.use('/api', taskRoutes);

// Rota simples para teste
app.get('/', (req, res) => {
  res.send('API To-Do List está rodando!');
});

// Middleware básico de 404
app.use((req, res, next) => {
  return res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
