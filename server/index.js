require('dotenv').config();
// pull database configuration from environment variables
const {
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_CONN_LIMIT
} = process.env;

const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

// mysql connection using mysql2 promise API
const mysql = require('mysql2/promise');
let pool;

async function initDb() {
  if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
    throw new Error('Database configuration missing. Please set DB_HOST, DB_USER, DB_PASS and DB_NAME in environment.');
  }
  pool = await mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,      // change as appropriate
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: Number(DB_CONN_LIMIT) || 10,
    queueLimit: 0
  });
}
const app = express();
app.use(cors());
app.use(express.json());
// helper – create a signed JWT
function signToken(user) {
  // keep only the data you need on the client
  const payload = { id: user.id, role: user.role, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });
}

// verify that Authorization header has a valid Bearer token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = payload;              // available to later handlers
    next();
  });
}

// optional helper to allow by role
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// ========== Authentication ==========
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query(
    "SELECT id, email, role, password FROM users WHERE email = ?",
    [email]
  );
  const user = rows[0];
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  // remove hashed password before sending
  delete user.password;
  const token = signToken(user);
  res.json({ user, token });
});

/* basic registration support */
app.post("/auth/register", async (req, res) => {
  const { name, email, password, role = "Customer" } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  const [exists] = await pool.query("SELECT 1 FROM users WHERE email = ?", [email]);
  if (exists.length) {
    return res.status(400).json({ error: "Email already in use" });
  }
  // hash the password before storing
  const hashed = await bcrypt.hash(password, 10);
  const [info] = await pool.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name || null, email, hashed, role]
  );
  const [userRow] = await pool.query("SELECT id,name,email,role FROM users WHERE id = ?", [info.insertId]);
  const user = userRow[0];
  const token = signToken(user);
  res.status(201).json({ user, token });
});

// forgot password stub
app.post("/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  res.json({ message: `If ${email} exists we sent reset instructions.` });
});

// ========== Customers ==========
app.get("/customers", authenticateToken, async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM customers ORDER BY id DESC"
  );
  res.json(rows);
});


// app.post("/customers",authenticateToken,
//   authorizeRoles("Admin","Staff"), async (req, res) => {
app.post("/customers",authenticateToken, async (req, res) => {
  const { name, phone, email ,address} = req.body;
  const [info] = await pool.query(
    "INSERT INTO customers (name,phone,email,address) VALUES (?,?,?,?)",
    [name, phone, email ,address]
  );
  const [item] = await pool.query("SELECT * FROM customers WHERE id = ?", [info.insertId]);
  res.status(201).json(item[0]);
});

app.put("/customers/:id",authenticateToken, async (req, res) => {
  const id = Number(req.params.id);
  const { name, phone, email ,address} = req.body;
  const [info] = await pool.query(
    "UPDATE customers SET name=?, phone=?, email=? ,address=? WHERE id=?",
    [name, phone, email,address, id]
  );
  if (info.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  const [updated] = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);
  res.json(updated[0]);
});
app.delete(
  "/customers/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  async (req, res) => {
    const [info] = await pool.query("DELETE FROM customers WHERE id=?", [
      req.params.id,
    ]);
    if (!info.affectedRows) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  }
);

// app.patch(
//   "/customers/:id/delete",
//   authenticateToken,
//   async (req, res) => {
//     const id = Number(req.params.id);

//     const [info] = await pool.query(
//       "UPDATE customers SET isDeleted = true WHERE id = ?",
//       [id]
//     );

//     if (info.affectedRows === 0)
//       return res.status(404).json({ error: "Not found" });

//     res.json({ success: true, id });
//   }
// );

// ========== Orders ==========


app.get("/orders", async (req, res) => {
  const [orders] = await pool.query("SELECT * FROM orders ORDER BY id DESC");

  for (const order of orders) {
    const [items] = await pool.query(
      "SELECT id,name,quantity,price FROM order_items WHERE orderId=?",
      [order.id]
    );
    order.items = items;
    order.totalAmount = Number(order.totalAmount);
  }

  res.json(orders);
});



app.get("/orders/:id", async (req, res) => {
  const id = Number(req.params.id);

  const [orders] = await pool.query("SELECT * FROM orders WHERE id=?", [id]);
  if (!orders.length) return res.status(404).json({ error: "Not found" });

  const [items] = await pool.query(
    "SELECT id,name,quantity,price FROM order_items WHERE orderId=?",
    [id]
  );

  orders[0].items = items;
  orders[0].totalAmount = Number(orders[0].totalAmount);

  res.json(orders[0]);
});

app.post("/orders", async (req, res) => {
  const { customerName, orderDate, status, items } = req.body;

  if (!customerName || !orderDate || !items?.length) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const totalAmount = items.reduce(
      (sum, i) => sum + Number(i.price) * Number(i.quantity),
      0
    );

    const [order] = await conn.query(
      "INSERT INTO orders (customerName,orderDate,totalAmount,status) VALUES (?,?,?,?)",
      [customerName, orderDate, totalAmount, status]
    );

    for (const item of items) {
      await conn.query(
        "INSERT INTO order_items (orderId,name,quantity,price) VALUES (?,?,?,?)",
        [order.insertId, item.name, item.quantity, item.price]
      );
    }

    await conn.commit();
    res.status(201).json({ id: order.insertId });
  } catch (e) {
    await conn.rollback();
    res.status(500).json({ error: "Failed to create order" });
  } finally {
    conn.release();
  }
});

app.delete(
  "/orders/:id",
  authenticateToken,
  authorizeRoles("Admin"),
  async (req, res) => {
    const [info] = await pool.query("DELETE FROM orders WHERE id=?", [
      req.params.id,
    ]);
    if (!info.affectedRows) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  }
);

// ========== Inventory ==========
app.get("/inventory", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM inventory");
  res.json(rows);
});

app.post("/inventory", async (req, res) => {
  const { name, type, stock } = req.body;
  const [info] = await pool.query(
    "INSERT INTO inventory (name,type,stock) VALUES (?,?,?)",
    [name, type, stock]
  );
  const [item] = await pool.query("SELECT * FROM inventory WHERE id = ?", [info.insertId]);
  res.status(201).json(item[0]);
});

app.put("/inventory/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, type, stock } = req.body;
  const [info] = await pool.query(
    "UPDATE inventory SET name=?, type=?, stock=? WHERE id=?",
    [name, type, stock, id]
  );
  if (info.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  const [updated] = await pool.query("SELECT * FROM inventory WHERE id = ?", [id]);
  res.json(updated[0]);
});

app.delete("/inventory/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [info] = await pool.query("DELETE FROM inventory WHERE id = ?", [id]);
  if (info.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

// ========== Payments ==========
app.get("/payments", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM payments");
  res.json(rows);
});

app.post("/payments", async (req, res) => {
  const { orderId, amount, status, method, date } = req.body;
  const [info] = await pool.query(
    "INSERT INTO payments (orderId,amount,status,method,date) VALUES (?,?,?,?,?)",
    [orderId, amount, status, method, date]
  );
  const [item] = await pool.query("SELECT * FROM payments WHERE id = ?", [info.insertId]);
  res.status(201).json(item[0]);
});

app.put("/payments/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { orderId, amount, status, method, date } = req.body;
  const [info] = await pool.query(
    "UPDATE payments SET orderId=?, amount=?, status=?, method=?, date=? WHERE id=?",
    [orderId, amount, status, method, date, id]
  );
  if (info.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  const [updated] = await pool.query("SELECT * FROM payments WHERE id = ?", [id]);
  res.json(updated[0]);
});

app.delete("/payments/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [info] = await pool.query("DELETE FROM payments WHERE id = ?", [id]);
  if (info.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

// ========== Staff ==========
app.get("/staff", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM staff");
  res.json(rows);
});

app.post("/staff", authenticateToken, authorizeRoles('Admin','Manager'), async (req, res) => {
  const { name, role ,email,phone} = req.body;
  const [info] = await pool.query(
    "INSERT INTO staff (name,role ,email,phone) VALUES (?,?,?,?)",
    [name, role,email,phone]
  );
  const [item] = await pool.query("SELECT * FROM staff WHERE id = ?", [info.insertId]);
  res.status(201).json(item[0]);
});

app.put("/staff/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, role ,email,phone} = req.body;
  const [info] = await pool.query(
    "UPDATE staff SET name=?, role=? WHERE id=?",
    [name, role,email,phone, id]
  );
  if (info.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  const [updated] = await pool.query("SELECT * FROM staff WHERE id = ?", [id]);
  res.json(updated[0]);
});

app.delete("/staff/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [info] = await pool.query("DELETE FROM staff WHERE id = ?", [id]);
  if (info.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

// ========== Tailor Section ==========
app.get("/measurements", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT m.*, c.name as customerName FROM measurements m LEFT JOIN customers c ON m.customerId = c.id ORDER BY m.createdAt DESC"
  );
  res.json(rows);
});

app.post("/measurements", async (req, res) => {
  const { customerId, garmentType, garment, chest, waist, sleeve, length, price, notes } = req.body;
  
  if (!customerId || !garmentType || !price) {
    return res.status(400).json({ message: "customerId, garmentType, and price are required" });
  }

  try {
    const [info] = await pool.query(
      "INSERT INTO measurements (customerId, garmentType, garment, chest, waist, sleeve, length, price, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [customerId, garmentType, garment || null, chest || null, waist || null, sleeve || null, length || null, price, notes || null]
    );

    const [rows] = await pool.query(
      "SELECT m.*, c.name as customerName FROM measurements m LEFT JOIN customers c ON m.customerId = c.id WHERE m.id = ?",
      [info.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add measurement" });
  }
});

app.put("/measurements/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { garmentType, chest, waist, sleeve, length, price, notes } = req.body;

  try {
    const [info] = await pool.query(
      "UPDATE measurements SET garmentType=?, chest=?, waist=?, sleeve=?, length=?, price=?, notes=? WHERE id=?",
      [garmentType, chest, waist, sleeve, length, price, notes, id]
    );
    if (info.affectedRows === 0) return res.status(404).json({ error: "Not found" });

    const [rows] = await pool.query(
      "SELECT m.*, c.name as customerName FROM measurements m LEFT JOIN customers c ON m.customerId = c.id WHERE m.id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update measurement" });
  }
});

app.delete("/measurements/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const [info] = await pool.query("DELETE FROM measurements WHERE id = ?", [id]);
    if (info.affectedRows === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete measurement" });
  }
});

// start server after database initialized
initDb()
  .then(() => {
    app.use("/",(req,res)=>{
      res.send("<h2>server is running </h2>");
    });
    app.listen(5000, () => console.log("Backend running on port 5000 using MySQL database"));
  })
  .catch(err => {
    console.error("Failed to initialize database", err);
    process.exit(1);
  });
