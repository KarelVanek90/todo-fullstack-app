import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {/* HEADER */}
        <header className="w-full bg-blue-600 text-white py-4 shadow-md">
          <h1 className="text-center text-3xl font-bold tracking-wide">
            TODOS
          </h1>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex flex-1 items-center justify-center w-full">
          <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/todos" element={<Todos />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
