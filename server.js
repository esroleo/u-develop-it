const express = require('express');
// *** import module from db/database.js sqlite db connection
const db = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();


// *** import router logic from apiRoutes *** //
const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Use apiRoutes
app.use('/api', apiRoutes);


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

// Create a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
// VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];
// ES5 function, not arrow function, to use this
// db.run(sql, params, function(err, result) {
// if (err) {
// console.log(err);
// }
// console.log(result, this.lastID);
// });


// *** Connection test sql query *** //
// db.all(`SELECT * FROM candidates`, (err, rows) => {
//    // console.log(rows);
//   });

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