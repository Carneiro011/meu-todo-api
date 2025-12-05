// src/controllers/taskController.js
const Task = require('../models/taskModel');

// GET /tasks
async function listTasks(req, res) {
  try {
    const { status, order } = req.query;
    const tasks = await Task.getAllTasks({ status, order });
    return res.json(tasks);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// GET /tasks/:id
async function getTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.getTaskById(id);

    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.json(task);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// POST /tasks
async function createTask(req, res) {
  try {
    const { titulo, descricao, status } = req.body;

    if (!titulo) {
      return res.status(400).json({ error: 'O campo "titulo" é obrigatório' });
    }

    const validStatus = ['pendente', 'em_andamento', 'concluido'];
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const newTask = await Task.createTask({ titulo, descricao, status });
    return res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// PUT /tasks/:id
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    const validStatus = ['pendente', 'em_andamento', 'concluido'];
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const updatedTask = await Task.updateTask(id, { titulo, descricao, status });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// DELETE /tasks/:id
async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Task.deleteTask(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    return res.status(204).send(); // sem conteúdo, mas sucesso
  } catch (error) {
    console.error('Erro ao apagar tarefa:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
