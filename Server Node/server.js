
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let db;

async function iniciarBanco() {
    db = await open({
        filename: './acoditools.db',
        driver: sqlite3.Database
    });

    console.log("Banco conectado com sucesso!");
}

await iniciarBanco();

// Rota: Cadastrar novo usuário
app.post('/usuario', async (req, res) => {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        const existente = await db.get('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existente) {
            return res.status(409).json({ error: "Email já cadastrado." });
        }

        const result = await db.run(
            'INSERT INTO usuarios (nome, email, password) VALUES (?, ?, ?)',
            [nome, email, password]
        );

        res.status(201).json({ id: result.lastID, nome, email });
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
});

// Rota: Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha obrigatórios." });
    }

    try {
        const user = await db.get('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password]);
        if (!user) {
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        res.status(200).json({ message: "Login bem-sucedido", user });
    } catch (err) {
        res.status(500).json({ error: "Erro ao fazer login." });
    }
});

// Rota: Listar auditorias
app.get('/auditorias', async (req, res) => {
    try {
        const auditorias = await db.all('SELECT * FROM auditorias');
        res.json(auditorias);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar auditorias." });
    }
});

// Rota: Listar achados
app.get('/achados', async (req, res) => {
    try {
        const achados = await db.all('SELECT * FROM achados');
        res.json(achados);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar achados." });
    }
});

// Rota: Registrar novo achado
app.post('/achados', async (req, res) => {
    const { descricao, auditoria_id, status, data } = req.body;

    if (!descricao || !auditoria_id || !status || !data) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
        const result = await db.run(
            'INSERT INTO achados (descricao, auditoria_id, status, data) VALUES (?, ?, ?, ?)',
            [descricao, auditoria_id, status, data]
        );

        res.status(201).json({ id: result.lastID, descricao, auditoria_id, status, data });
    } catch (err) {
        res.status(500).json({ error: "Erro ao registrar achado." });
    }
});

// Rota: Dashboard - estatísticas de conformidade
app.get('/dashboard', async (req, res) => {
    try {
        const conforme = await db.get("SELECT COUNT(*) as total FROM auditorias WHERE status = 'Conforme'");
        const naoConforme = await db.get("SELECT COUNT(*) as total FROM auditorias WHERE status = 'Não Conforme'");
        const pendente = await db.get("SELECT COUNT(*) as total FROM auditorias WHERE status = 'Pendente'");

        res.json({
            conforme: conforme.total,
            naoConforme: naoConforme.total,
            pendente: pendente.total
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao gerar estatísticas." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
