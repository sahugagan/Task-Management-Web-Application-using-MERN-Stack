import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 py-12">
      <div className="container mx-auto px-6 sm:px-12 md:px-24">
        {tasks.length !== 0 && <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Tasks ({tasks.length})</h2>}

        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 rounded-xl shadow-2xl mt-8 space-y-6">
                <span className="text-white text-3xl font-bold">No tasks found</span>
                <p className="text-white text-lg opacity-80">You haven't added any tasks yet. Start by adding your first task.</p>
                
                <Link to="/tasks/add" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium shadow-lg transform transition-all hover:scale-110 hover:bg-blue-700 hover:text-white ease-in-out duration-300">
                  + Add New Task
                </Link>
              
                <p className="text-white text-sm opacity-60">If you need help, visit our guide.</p>
              </div>
            ) : (
              <>
                {/* Show Add New Task button if tasks are present */}
                <Link to="/tasks/add" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium shadow-lg transform transition-all hover:scale-110 hover:bg-blue-700 hover:text-white ease-in-out duration-300 mb-6">
                  + Add New Task
                </Link>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tasks.map((task, index) => (
                    <div key={task._id} className="bg-white p-6 rounded-xl shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-800">Task #{index + 1}</span>
                        <div className="flex items-center space-x-4">
                          <Tooltip text="Edit this task" position="top">
                            <Link to={`/tasks/${task._id}`} className="text-blue-600 hover:text-blue-700 transition duration-200">
                              <i className="fa-solid fa-pen text-lg"></i>
                            </Link>
                          </Tooltip>
                          <Tooltip text="Delete this task" position="top">
                            <span className="text-red-600 cursor-pointer hover:text-red-700 transition duration-200" onClick={() => handleDelete(task._id)}>
                              <i className="fa-solid fa-trash text-lg"></i>
                            </span>
                          </Tooltip>
                        </div>
                      </div>

                      <div className="mt-4 text-lg font-medium text-gray-800">
                        <p className="text-xl">{task.name}</p> {/* Task name */}
                        <p className="text-sm text-gray-500">
                          Created on: {new Date(task.createdAt).toLocaleDateString()} at {new Date(task.createdAt).toLocaleTimeString()} {/* Task created time */}
                        </p>
                      </div>

                      <div className="mt-4 text-gray-600 text-base">
                        {task.description}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
