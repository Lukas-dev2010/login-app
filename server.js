const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public', 'Online-Casino')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Online-Casino', 'login.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});