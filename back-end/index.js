const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Agendamento } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/agendamentos', async (req, res) => {
    const { nome, descricao, telefone, email, mensagem } = req.body;

    try {
        const agendamento = await Agendamento.create({ nome, descricao, telefone, email, mensagem });

        // Enviar e-mail de confirmação
        const emailText = `
            Serviço: ${descricao}\n
            Cliente: ${nome}\n
            Telefone: ${telefone}\n
            E-mail: ${email}\n
            Mensagem: ${mensagem}\n
        `;

        await transporter.sendMail({
            from: `"ECT CONTABIL" <${process.env.EMAIL_USER}>`,
            to: process.env.NOTIFICATION_EMAIL, // Email para enviar a notificação
            subject: 'Nova Mensagem Recebida.',
            text: emailText,
        });

        res.status(201).json(agendamento);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar agendamento', error });
    }
});

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});