const express = require("express");
const connectDB = require("./database/connect");
const cors = require("cors");

const autRouters = require("./routes/authRoutes");
const todoRouters = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const path = require("path");

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use(cors());
app.use(express.json());

app.use("/api", autRouters);
app.use("/api", todoRouters);

connectDB();

app.get("/", (req, res) => {
  res.send("Jsi na hlavni strance, vitej tedy");
});

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
