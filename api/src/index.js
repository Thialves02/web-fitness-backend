const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const routes = require("./routes/index.routes");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  app.use(cors())
  next()
})

dotenv.config();
database();

app.use("/api/users", routes)

const porta = 3001

app.listen(porta, () => {
  console.log(`Server started on port ${porta} 🔥`);
});
