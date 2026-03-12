import React from "react";

const FormTask = ({ newTask, handleAdd, handleChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        placeholder="Název úkolu"
        value={newTask.title}
        onChange={handleChange}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        name="description"
        placeholder="Popis úkolu"
        value={newTask.description}
        onChange={handleChange}
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Přidat úkol
      </button>
    </div>
  );
};

export default FormTask;
