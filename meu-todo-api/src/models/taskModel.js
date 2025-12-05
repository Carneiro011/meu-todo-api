// src/models/taskModel.js
const db = require('./db');

// Lista tarefas com filtro por status e ordenação por data
async function getAllTasks({ status, order }) {
  let sql = 'SELECT * FROM tasks';
  const params = [];

  if (status) {
    sql += ' WHERE status = ?';
    params.push(status);
  }

  // ordenação por data_criacao
  if (order && order.toLowerCase() === 'asc') {
    sql += ' ORDER BY data_criacao ASC';
  } else {
    sql += ' ORDER BY data_criacao DESC';
  }

  const [rows] = await db.query(sql, params);
  return rows;
}

async function getTaskById(id) {
  const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0] || null;
}

async function createTask({ titulo, descricao, status }) {
  const [result] = await db.query(
    'INSERT INTO tasks (titulo, descricao, status) VALUES (?, ?, ?)',
    [titulo, descricao, status || 'pendente']
  );

  return getTaskById(result.insertId);
}

async function updateTask(id, { titulo, descricao, status }) {
  // Busca tarefa atual
  const task = await getTaskById(id);
  if (!task) return null;

  const newTitulo = titulo ?? task.titulo;
  const newDescricao = descricao ?? task.descricao;
  const newStatus = status ?? task.status;

  await db.query(
    'UPDATE tasks SET titulo = ?, descricao = ?, status = ? WHERE id = ?',
    [newTitulo, newDescricao, newStatus, id]
  );

  return getTaskById(id);
}

async function deleteTask(id) {
  const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
