import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2';

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState('');

  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption('');
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div>
      {todoList.map((item, index) => (
        <div
          key={index}
          className="flex justify-between bg-gray-50 dark:bg-dark-surface-2 border border-gray-100 dark:border-dark-border px-3 py-2 rounded-md mb-3 mt-2"
        >
          <p className="text-xs text-black dark:text-dark-text">
            <span className="text-xs text-gray-400 dark:text-dark-text-secondary font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>

          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="w-full text-[13px] text-black dark:text-dark-text outline-none bg-white dark:bg-dark-surface-2 border border-gray-100 dark:border-dark-border px-3 py-2 rounded-md placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary"
        />

        <button
          className="card-btn text-nowrap"
          onClick={handleAddOption}
        >
          <HiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
