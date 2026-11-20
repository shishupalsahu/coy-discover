const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const dbPath = path.join(__dirname, 'data', 'db.json');


const getDbData = () => {
  const jsonData = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(jsonData);
};

const saveDbData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

app.get('/', (req, res) => {
  res.send('Coy Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});