import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      navigate("/todos");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Login </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Nemáš účet?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Registruj se
        </Link>
      </p>
      {error && <p className="text-red-500 text-center mt-3">{error}</p>}
    </div>
  );
}

export default Login;
