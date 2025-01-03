import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {
  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    name: "", // Task name field added
    description: ""
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ name: data.task.name, description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      name: task.name,  // Reset task name
      description: task.description
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const taskData = { ...formData, createdAt: new Date().toISOString() }; // Add createdAt for new tasks

    if (mode === "add") {
      const config = { url: "/tasks", method: "post", data: taskData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/"); // After successful creation
      });
    } else {
      const config = { url: `/tasks/${taskId}`, method: "put", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/"); // After successful update
      });
    }
  };

  const fieldError = (field) => (
    <p className={`mt-2 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500">
        <form className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">{mode === "add" ? "Add New Task" : "Edit Task"}</h2>
              
              {/* Task Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Task Name</label>
                <input 
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300 mt-2"
                  placeholder="Enter task name..."
                />
                {fieldError("name")}
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
                <Textarea 
                  name="description" 
                  id="description" 
                  value={formData.description} 
                  placeholder="Write here..." 
                  onChange={handleChange} 
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-300 mt-2"
                />
                {fieldError("description")}
              </div>

              {/* Date and Time Display */}
              {mode === "update" && task && (
                <div className="mb-6 text-gray-600 text-sm">
                  <p>Created on: {new Date(task.createdAt).toLocaleDateString()} at {new Date(task.createdAt).toLocaleTimeString()}</p>
                  {task.updatedAt && <p>Last Updated: {new Date(task.updatedAt).toLocaleDateString()} at {new Date(task.updatedAt).toLocaleTimeString()}</p>}
                </div>
              )}

              <div className="flex justify-end gap-4">
                <button 
                  className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition duration-300"
                  onClick={handleSubmit}
                >
                  {mode === "add" ? "Add Task" : "Update Task"}
                </button>
                
                <button 
                  className="bg-red-500 text-white px-6 py-3 rounded-full font-medium hover:bg-red-600 transition duration-300"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>

                {mode === "update" && (
                  <button 
                    className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition duration-300"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </MainLayout>
  );
};

export default Task;
