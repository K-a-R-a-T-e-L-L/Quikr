const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const app = express();
const port = 4000;
const add = require('../server/routes/addingMessage');
const getM = require('../server/routes/getMessages');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.run('CREATE TABLE messages (admin, text, file);');
// db.run('DELETE FROM messages');
// db.run('DROP TABLE messages');

app.use(add);
app.use(getM);

app.listen(port, () => console.log('server started:' + port));
