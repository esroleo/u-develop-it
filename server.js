const express = require('express');
/// *** import sqlite3 module packages *** //
const sqlite3 = require('sqlite3').verbose();


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
      return console.error(err.message);
    }
  
    console.log('Connected to the election database.');
  });

// Get all candidates
// req will not be used as we are do not need the argument from the params.
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({
        message: 'success',
        data: rows
      });
    });
});

// Get single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates 
                 WHERE id = ?`;
    const params = [req.params.id]; // *** req.parameters contain the id sent from the fetch or call.
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: row
      });
    });
  });


// *** Test if root source works *** //
// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
//   });

// GET a single candidate
// Method .get retrieves data
// db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//       console.log(err);
//     }
//     console.log(row);
//   });

// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
  
      res.json({
        message: 'successfully deleted',
        changes: this.changes
      });
    });
  });

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];
// ES5 function, not arrow function, to use this
// db.run(sql, params, function(err, result) {
// if (err) {
// console.log(err);
// }
// console.log(result, this.lastID);
// });


// *** Connection test sql query *** //
db.all(`SELECT * FROM candidates`, (err, rows) => {
   // console.log(rows);
  });

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
  });


// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });