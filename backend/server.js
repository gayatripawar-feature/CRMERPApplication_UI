const express = require("express");
const cors = require("cors");
require("dotenv").config(); // load .env
const pool = require("./Config/db"); // import DB connection
const app = express();

app.use(cors());
app.use(express.json());


// Test route to check if server is working
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});


// Api for sales person :
// app.post("/sales-person", (req, res) => {
//   const { name, email, mobile, designation, joiningDate, status } = req.body;
//   const sql = `INSERT INTO sales_persons 
//     (name, email, mobile, designation, joiningDate, status) 
//     VALUES (?, ?, ?, ?, ?, ?)`;
//   pool.query(
//     sql,
//     [name, email, mobile, designation, joiningDate, status],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting data:", err);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.status(201).json({ message: "Sales person added", id: result.insertId });
//     }
//   );
// });

app.post("/sales-person", async (req, res) => {
  try {
    const { name, email, mobile, designation, joiningDate, status } = req.body;

    const sql = `INSERT INTO sales_persons 
      (name, email, mobile, designation, joiningDate, status) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.query(sql, [
      name,
      email,
      mobile,
      designation,
      joiningDate,
      status,
    ]);

    res.status(201).json({
      message: "Sales person added",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Database error" });
  }
});



console.log("server started");
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
