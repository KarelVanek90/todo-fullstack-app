import React from "react";

const FilterButtons = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setFilter("all")}
        className={`px-3 py-1 rounded transition ${filter === "all" ? "bg-gray-600 text-white shadow" : "bg-blue-200  hover:bg-green-300"}`}
      >
        Vše
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-3 py-1 rounded transition ${filter === "completed" ? "bg-gray-600 text-white shadow" : "bg-blue-200 hover:bg-green-300"}`}
      >
        Splněno
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-3 py-1 rounded transition ${filter === "active" ? "bg-gray-600 text-white shadow" : "bg-blue-200  hover:bg-green-300"}`}
      >
        Nesplněno
      </button>
    </div>
  );
};

export default FilterButtons;
