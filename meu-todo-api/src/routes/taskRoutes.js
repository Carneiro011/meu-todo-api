// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Rotas CRUD
router.get('/tasks', taskController.listTasks);        // listar todas (com filtros)
router.get('/tasks/:id', taskController.getTask);      // buscar por id
router.post('/tasks', taskController.createTask);      // criar
router.put('/tasks/:id', taskController.updateTask);   // atualizar
router.delete('/tasks/:id', taskController.deleteTask); // deletar

module.exports = router;
