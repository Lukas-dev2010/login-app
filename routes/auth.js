const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//IP Check
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Kein Token, Zugriff verweigert' });
    }

    jwt.verify(token, 'Josiahistgay', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token ungültig' });

        req.user = user;
        next();
    });
}

// Registrierung
router.post('/register', async(req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Benutzername bereits vergeben' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            balance: 10000
        });
        await newUser.save();

        res.status(201).json({ message: 'Benutzer erstellt mit 10.000 Guthaben' });
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler' });
    }
});

// Login
router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Ungültige Anmeldedaten' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Ungültige Anmeldedaten' });

        const token = jwt.sign({ userId: user._id }, 'Josiahistgay', { expiresIn: '1h' });
        res.json({ token, balance: user.balance });
    } catch (err) {
        res.status(500).json({ message: 'Serverfehler' });
    }
});

// Geld
router.get('/guthaben', authenticateToken, async(req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('username geld');
        if (!user) return res.status(404).json({ message: 'Benutzer nicht gefunden' });

        res.json({ username: user.username, geld: user.geld });
    } catch (error) {
        res.status(500).json({ message: 'Serverfehler' });
    }
});

module.exports = router;