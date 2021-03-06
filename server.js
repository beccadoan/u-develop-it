require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')
const db = require('./db/connection')

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)
app.use((req, res) => {
    res.status(404).end();
})

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });