// src/testConnection.js
const db = require('./models/db');

async function testar() {
  try {
    const [rows] = await db.query('SELECT 1 AS resultado');
    console.log('Conexão OK:', rows);
  } catch (error) {
    console.error('Erro ao conectar no MySQL:', error);
  }
}

testar();
