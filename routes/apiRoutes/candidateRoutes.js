const router = require('express').Router();
const mysql = require('mysql2');
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
router.get('/candidates', (req, res) => {
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
router.get('/candidates/:id', (req, res) => {
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
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//             VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if(err) {
//         console.log(err);
//     } else console.log(result);
// })

// router.post('/animals', (req, res) => {
//     req.body.id = animals.length.toString();

//     if (!validateAnimal(req.body)) {
//         res.status(400).send('The animal is not properly formatted.')
//     } else {
//         const animal = createNewAnimal(req.body, animals)
//         res.json(animal)
//     }
// })

router.delete('/candidates/:id', (req, res) => {
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