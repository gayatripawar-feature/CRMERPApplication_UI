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
// Admin Module APIs:
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


// Update Sales Person by ID
app.put("/update-sales-person/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, joiningDate, status } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE sales_persons 
       SET name = ?, email = ?, mobile = ?, designation = ?, joiningDate = ?, status = ? 
       WHERE id = ?`,
      [name, email, mobile, designation, joiningDate, status, id]
    );
   if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sales person not found" });
    }
    res.json({ message: "Sales person updated successfully", id });
  } catch (error) {
    console.error("Error updating sales person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// DELETE /delete-sales-person/:id
app.delete("/delete-sales-person/:id", async (req, res) => {
  const { id } = req.params;
try {
    // Delete the record from the database
    const [result] = await pool.query(
      "DELETE FROM sales_persons WHERE id = ?",
      [id]
    );
   if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sales Person not found" });
    }
  res.json({ message: "Sales Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting sales person:", error);
    res.status(500).json({ message: "Server error while deleting sales person" });
  }
});

// 2) Banker Details API

// Add a banker
app.post("/bankers", async (req, res) => {
  const { name, address, mobile, designation,  status, bankers, apfLetter, timestamp } = req.body;
  console.log("📩 Incoming payload:", req.body); 
  try {
    const [result] = await pool.query(
      `INSERT INTO bankers (name, address, mobile, designation,  status, apfLetter, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, mobile, designation,  status, JSON.stringify(apfLetter || []), timestamp]
    );
    const bankerId = result.insertId;
   // Insert bankers array in a separate table
    if (bankers && bankers.length > 0) {
      for (let b of bankers) {
        await pool.query(
          "INSERT INTO banker_contacts (bankerId, bankerName, bankerMobile) VALUES (?, ?, ?)",
          [bankerId, b.bankerName, b.bankerMobile]
        );
      }
    }
   res.status(201).json({ message: "Banker added successfully", id: bankerId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// GET all bankers



console.log("server started");
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
