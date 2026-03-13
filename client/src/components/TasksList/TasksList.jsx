import React from "react";
import TaskItem from "../TaskItem/TaskItem";

const TasksList = ({ data, handleEdit, handleDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center">
        <p className="w-6 h-6 animate-spin ">⏳</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 min-h-[400px] max-h-[400px] overflow-y-auto">
      {data.length === 0 ? (
        <p className="text-center text-gray-400 text-4xl mt-10">Žádné úkoly</p>
      ) : (
        data.map((item) => (
          <TaskItem
            key={item._id}
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default TasksList;
