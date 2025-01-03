import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";
import { postLoginData } from '../redux/actions/authActions';
import validateManyFields from '../validations';

const LoginForm = ({ redirectUrl }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();


  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [authState, redirectUrl, isLoggedIn, navigate]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  }



  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <div className="flex flex-wrap min-h-screen">
  
    <div className="relative w-full md:w-1/2 flex justify-center items-center h-screen">
      <img
        src="https://images.unsplash.com/photo-1692158961713-73690ef06e6e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFzayUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D"
        alt="Time Management Illustration"
        className="h-full w-full object-cover"
      />
    
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
          Welcome to <span className="text-blue-400">Task Management System</span>
        </h1>
        <div className="text-lg md:text-2xl text-gray-300">
          <Typewriter
            options={{
              strings: [
                "Plan your day, achieve your goals.",
                "Stay organized, stay productive.",
                "Your time, your success.",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </div>
      </div>
    </div>

    
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 h-screen">
    <form className="max-w-lg w-full bg-white bg-opacity-90 backdrop-blur-md p-8 shadow-2xl rounded-lg">
  <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
    Welcome Back!
  </h2>
  <p className="text-gray-600 text-center mb-6">
    Manage your tasks efficiently and effortlessly.
  </p>

  <div className="mb-6 relative">
    <label
      htmlFor="email"
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      Email <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="youremail@domain.com"
      className="w-full px-4 py-3 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition duration-300"
    />
    {fieldError("email")}
  </div>

  <div className="mb-6 relative">
    <label
      htmlFor="password"
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      Password <span className="text-red-500">*</span>
    </label>
    <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Your password..."
      className="w-full px-4 py-3 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition duration-300"
    />
    {fieldError("password")}
  </div>

  <button
    onClick={handleSubmit}
    className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:opacity-90 transition duration-300 transform hover:scale-105"
  >
    Log In
  </button>

  <div className="mt-8 text-center">
    <p className="text-sm text-gray-600">
      Don’t have an account?{" "}
      <Link
        to="/signup"
        className="text-purple-500 font-bold hover:underline transition duration-300"
      >
        Sign up now
      </Link>
    </p>
  </div>
</form>

    </div>
  </div>
);
}

export default LoginForm