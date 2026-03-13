const Todo = require("../models/Todo");

const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!deleted) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "error",
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const todos = await Todo.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Todo.countDocuments({
      userId: req.user.userId,
    });

    const completed = await Todo.countDocuments({
      userId: req.user.userId,
      completed: true,
    });

    const active = await Todo.countDocuments({
      userId: req.user.userId,
      completed: false,
    });

    res.json({
      msg: "Data uploaded successfully",
      docs: todos,
      total,
      completed,
      active,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Failed to fetch todos",
    });
  }
};

const editTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const updated = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      {
        $set: {
          title,
          description,
          completed,
        },
      },
      {
        new: true,
      },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(updated);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Todo not modified",
    });
  }
};

const createTodo = async (req, res) => {
  const { title, description, completed } = req.body;
  const item = await Todo.create({
    title,
    description,
    completed,
    userId: req.user.userId,
  });

  try {
    res.json(item);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Todo not created",
    });
  }
};

module.exports = {
  deleteTodo,
  getTodos,
  editTodo,
  createTodo,
};
