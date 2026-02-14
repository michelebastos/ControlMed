
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// Middleware de autenticação
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

function authMiddleware(req, res, next) {
	const auth = req.headers.authorization;
	if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Token não fornecido' });
	try {
		const payload = jwt.verify(auth.replace('Bearer ', ''), JWT_SECRET);
		req.user = payload;
		next();
	} catch {
		return res.status(401).json({ error: 'Token inválido' });
	}
}

function adminOnly(req, res, next) {
	if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Acesso restrito a administradores' });
	next();
}

// Rotas públicas
app.use('/auth', require('./routes/auth'));

// Exemplo de rota protegida (aplique authMiddleware/adminOnly nas rotas que quiser proteger)
app.get('/admin/ping', authMiddleware, adminOnly, (req, res) => {
	res.json({ ok: true, user: req.user });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log('Servidor rodando na porta', PORT);
});
