require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Connect to database

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: db_user,
        password: db_pass,
        database: 'election'
    },
    console.log('Connected to the election database')
)
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
})

app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})