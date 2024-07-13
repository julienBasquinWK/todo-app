const express = require('express');
const router = express.Router();
const ToDo = require('../models/ToDo');

// Obtenir toutes les tâches
router.get('/', async (req, res) => {
    const todos = await ToDo.find();
    console.log('Fetching todos:', todos);
    res.json(todos);
});

// Ajouter une nouvelle tâche
router.post('/', async (req, res) => {
    const todo = new ToDo({
        text: req.body.text,
        completed: req.body.completed,
    });
    await todo.save();
    console.log('Todo added:', todo);
    res.json(todo);
});

// Mettre à jour une tâche
router.patch('/:id', async (req, res) => {
    const todo = await ToDo.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        { new: true }
    );
    console.log('Todo updated:', todo);
    res.json(todo);
});

// Supprimer une tâche
router.delete('/:id', async (req, res) => {
    await ToDo.findByIdAndDelete(req.params.id);
    console.log('Todo deleted:', req.params.id);
    res.sendStatus(204);
});

module.exports = router;
