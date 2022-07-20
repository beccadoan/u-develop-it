const router = require('express').Router();
const mysql = require('mysql2');
const inputCheck = require('../../utils/inputCheck')
require('dotenv').config();


const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

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

// Get all candidates
router.get('/candidate', (req, res) => {
    db.query(`SELECT * FROM candidates`, (err, rows) => {
    if(err){
        res.status(500).json({error: error.message})
        return
    } 
    res.json({
        message: 'success',
        data: rows
    })
    })
})

// Get a single candidate
router.get('/candidate/:id', (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM candidates WHERE id = ?`, id, (err, row) => {
        if(err){
            res.status(500).json({error: error.message})
            return
        } 
        res.json({
            message: 'success',
            data: row
        })
    })
    
})

// Create a candidate
router.post('/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
});
  });

router.delete('/candidate/:id', (req, res) => {
    const id = req.params.id;
    db.query(`DELETE FROM candidates WHERE id = ?`, id, (err, result) => {
        if(err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
              });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
              });
        }
    })
})


module.exports = router;