const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", (req, res) => {
  const w = req.body;

  const text = `
Customer: ${w.customerName}
Phone: ${w.phone}
Work: ${w.workType}
Status: ${w.status}
Delivery: ${w.deliveryDate}
-------------------------
`;

  fs.appendFileSync("records.txt", text);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
