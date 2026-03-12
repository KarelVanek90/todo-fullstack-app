const API_URL = process.env.REACT_APP_API_URL;
const getToken = () => localStorage.getItem("token");

export const loginUser = async (form) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to load tasks");
    }
    return await res.json();
  } catch (err) {
    throw new Error(err.message || "Login failed");
  }
};

export const registrUser = async (form) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  } catch (err) {
    throw new Error(err.message || "Registration failed");
  }
};

export const getTodos = async (pageNumber = 1) => {
  const token = getToken();

  console.log("TOKEN:", token);
  try {
    const res = await fetch(`${API_URL}/todos?page=${pageNumber}&limit=10`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to load task");
    }
    return await res.json();
  } catch (err) {
    throw new Error(err.message || "Data not loaded");
  }
};

export const createTodo = async (todo) => {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(todo),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to created task");
    }
    return await res.json();
  } catch (err) {
    throw new Error(err.message || "Data not created");
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to delete task");
    }
    return await res.json();
  } catch (err) {
    throw new Error(err.message || "Data not deleted");
  }
};

export const updateTodo = async (id, updated) => {
  try {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(updated),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to update task");
    }
    return await res.json();
  } catch (err) {
    throw new Error(err.message || "Data not updated");
  }
};
