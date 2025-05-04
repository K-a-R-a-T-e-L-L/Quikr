const express = require('express');
const { upload } = require('../middleware/multer');
const sqli3 = require('sqlite3').verbose();
const db = new sqli3.Database('database.db');
const router = express.Router();

router.post('/add', upload.single('file'), async (req, res) => {
    const data = req.body;
    
    try {
        db.run('INSERT INTO messages (admin, text, file) VALUES(?,?,?);', [data.admin, data.text, JSON.stringify(req.file)], function (err) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            };
            res.send('Message added successfully');
        })
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = router;