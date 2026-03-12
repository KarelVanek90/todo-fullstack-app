const express = require("express");
const connectDB = require("./database/connect");
const cors = require("cors");

//const getData = require("./routes/todos/GET/getTodos");
//const editData = require("./routes/todos/POST/editTodos");
//const postDate = require("./routes/todos/POST/postTodos");
//const deleteTodo = require("./routes/todos/DELETE/deleteTodo");
//const register = require("./routes/auth/register");
//const login = require("./routes/auth/login");

const autRouters = require("./routes/authRoutes");
const todoRouters = require("./routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(postDate);
// app.use(editData);
//app.use(register);
//app.use(login);
//app.use(deleteTodo);

app.use("/api", autRouters);
app.use("/api", todoRouters);

connectDB();

app.get("/", (req, res) => {
  res.send("Jsi na hlavni strance, vitej tedy");
});

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
