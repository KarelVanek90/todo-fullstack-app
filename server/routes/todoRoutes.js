const router = require("express").Router();
const authMiddleware = require("../middleware/authMilddleware");
const {
  deleteTodo,
  getTodos,
  editTodo,
  createTodo,
} = require("../controllers/todoController");

router.get("/todos", authMiddleware, getTodos);
router.post("/todos", authMiddleware, createTodo);
router.put("/todos/:id", authMiddleware, editTodo);
router.delete("/todos/:id", authMiddleware, deleteTodo);

module.exports = router;
