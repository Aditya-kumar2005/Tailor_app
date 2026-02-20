const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dataDir = "test-data";
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

let nextId = 1;
const customers = [];

app.post("/customers", (req, res) => {
  console.log("[POST] Received request");
  const item = { id: nextId++, ...req.body };
  const filename = path.join(dataDir, `customer_${item.id}.json`);
  const content = JSON.stringify(item, null, 2);
  
  try {
    console.log(`[POST] Writing to ${filename}`);
    fs.writeFileSync(filename, content, "utf-8");
    console.log(`[POST] File saved`);
  } catch (err) {
    console.error(`[POST] Error: ${err.message}`);
  }
  
  customers.push(item);
  res.status(201).json(item);
});

app.listen(5001, () => console.log("Test server on port 5001"));
