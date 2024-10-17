const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = `mongodb+srv://ectcontabil2024:${process.env.PASSWORD_MONGO}@ect-contabil.vykg1.mongodb.net/?retryWrites=true&w=majority&appName=ect-contabil`;

mongoose.connect(connectionString, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));


// Modelo de Agendamento
const AgendamentoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
});

const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);

module.exports = { Agendamento };
