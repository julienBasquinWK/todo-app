const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connecter à MongoDB
mongoose.connect('mongodb://localhost:27017/todolist').then(r => {
    console.log('Connected to MongoDB');
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Route pour tester le backend
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Importer les routes
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
