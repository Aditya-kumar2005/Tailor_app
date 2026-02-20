const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ensure data directory exists
const dataDir = "data";
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// in-memory stores
let nextId = 1;
const customers = [];
const orders = [];
const inventory = [];
const payments = [];
const staff = [];

// hard-coded users for authentication
const users = [
  { id: 1, email: "admin@example.com", password: "admin", role: "Admin" },
  { id: 2, email: "staff@example.com", password: "staff", role: "Staff" },
  { id: 3, email: "cust@example.com", password: "cust", role: "Customer" },
];

// helper to find by id
function findById(arr, id) {
  return arr.find((i) => i.id === id);
}

// helper: save record to individual txt file
function saveRecord(type, id, record) {
  const filename = path.join(dataDir, `${type}_${id}.txt`);
  const content = JSON.stringify(record, null, 2);
  try {
    fs.writeFileSync(filename, content, "utf-8");
  } catch (err) {
    console.error(`save error on ${filename}:`, err.message);
  }
}

// ========== Authentication ==========
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ id: user.id, email: user.email, role: user.role });
});

// ========== Customers ==========
app.get("/customers", (req, res) => res.json(customers));

app.post("/customers", (req, res) => {
  const item = { id: nextId++, ...req.body };
  customers.push(item);
  saveRecord("customer", item.id, item);
  res.status(201).json(item);
});

app.put("/customers/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = findById(customers, id);
  if (!existing) return res.status(404).json({ error: "Not found" });
  Object.assign(existing, req.body);
  saveRecord("customer", id, existing);
  res.json(existing);
});

app.delete("/customers/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = customers.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  customers.splice(idx, 1);
  res.json({ success: true });
});

// ========== Orders ==========
app.get("/orders", (req, res) => res.json(orders));

app.post("/orders", (req, res) => {
  const item = { id: nextId++, ...req.body };
  orders.push(item);
  saveRecord("order", item.id, item);
  res.status(201).json(item);
});

app.put("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = findById(orders, id);
  if (!existing) return res.status(404).json({ error: "Not found" });
  Object.assign(existing, req.body);
  saveRecord("order", id, existing);
  res.json(existing);
});

app.delete("/orders/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = orders.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  orders.splice(idx, 1);
  res.json({ success: true });
});

// ========== Inventory ==========
app.get("/inventory", (req, res) => res.json(inventory));

app.post("/inventory", (req, res) => {
  const item = { id: nextId++, ...req.body };
  inventory.push(item);
  saveRecord("inventory", item.id, item);
  res.status(201).json(item);
});

app.put("/inventory/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = findById(inventory, id);
  if (!existing) return res.status(404).json({ error: "Not found" });
  Object.assign(existing, req.body);
  saveRecord("inventory", id, existing);
  res.json(existing);
});

app.delete("/inventory/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = inventory.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  inventory.splice(idx, 1);
  res.json({ success: true });
});

// ========== Payments ==========
app.get("/payments", (req, res) => res.json(payments));

app.post("/payments", (req, res) => {
  const item = { id: nextId++, ...req.body };
  payments.push(item);
  saveRecord("payment", item.id, item);
  res.status(201).json(item);
});

app.put("/payments/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = findById(payments, id);
  if (!existing) return res.status(404).json({ error: "Not found" });
  Object.assign(existing, req.body);
  saveRecord("payment", id, existing);
  res.json(existing);
});

app.delete("/payments/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = payments.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  payments.splice(idx, 1);
  res.json({ success: true });
});

// ========== Staff ==========
app.get("/staff", (req, res) => res.json(staff));

app.post("/staff", (req, res) => {
  const item = { id: nextId++, ...req.body };
  staff.push(item);
  saveRecord("staff", item.id, item);
  res.status(201).json(item);
});

app.put("/staff/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = findById(staff, id);
  if (!existing) return res.status(404).json({ error: "Not found" });
  Object.assign(existing, req.body);
  saveRecord("staff", id, existing);
  res.json(existing);
});

app.delete("/staff/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = staff.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  staff.splice(idx, 1);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Backend running on port 5000 with file saving enabled"));
