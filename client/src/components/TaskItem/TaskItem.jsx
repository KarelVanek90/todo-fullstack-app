import React from "react";

const TaskItem = ({ item, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition flex justify-between items-center">
      {/* LEFT SIDE */}
      <div className="flex items-start  gap-2 flex-1">
        <div>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() =>
              handleEdit(item._id, {
                ...item,
                completed: !item.completed,
              })
            }
            className="w-5 h-5 mt-1 accent-blue-600 cursor-pointer"
          />
        </div>
        <div className="break-words">
          <h4
            className={`font-semibold text-lg ${
              item.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {item.title}
          </h4>

          <p className="text-gray-600 text-sm break-words">
            {item.description}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-center gap-2 w-13">
        <button
          onClick={() => handleDelete(item._id)}
          className="bg-red-200 text-black px-2 py-1.5 rounded hover:bg-red-600 transition hover:text-white"
        >
          Smazat
        </button>

        <p className="text-xs text-gray-400 text-center">
          {item.completed ? "Splněno" : "Nesplněno"}
        </p>
      </div>
    </div>
  );
};

export default TaskItem;
