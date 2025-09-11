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
// Api To insert into sales Person - admin module :
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


// Api to get the records of sales_person :
app.get("/get-sales-person", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM sales_persons"); 
    res.json(rows); // send DB rows to frontend
  } catch (err) {
    console.error("Error fetching sales persons:", err.message);
    res.status(500).json({ error: "Database fetch failed" });
  }
});



console.log("server started");
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
