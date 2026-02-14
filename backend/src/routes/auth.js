const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../../users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Cadastro
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuário e senha obrigatórios' });
  const users = loadUsers();
  if (users.find(u => u.username === username)) return res.status(409).json({ error: 'Usuário já existe' });
  const hash = bcrypt.hashSync(password, 10);
  users.push({ username, password: hash, role: role || 'user' });
  saveUsers(users);
  res.json({ success: true });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, username: user.username, role: user.role });
});

module.exports = router;
