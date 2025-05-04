const express = require('express');
const sqli3 = require('sqlite3').verbose();
const db = new sqli3.Database('database.db');
const router = express.Router();

router.get('/getM', async (req, res) => {
    try {
        db.all('SELECT * FROM messages;', (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            };
            res.status(200).send(rows);
        })
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    };
});


module.exports = router;