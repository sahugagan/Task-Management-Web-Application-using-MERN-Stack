import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import Loader from "./utils/Loader";

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });
  };

  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Panel */}
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1510511336377-1a9caa095849?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRhc2slMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww"
            alt="Task Management"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8">
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img
                  src="https://preview.redd.it/hi-this-is-a-logo-for-the-task-manager-application-called-v0-si3hzlaglc7b1.png?width=640&crop=smart&auto=webp&s=04d231d246026a59f988ac183a82e0ea2ca8ef4e"
                  alt="Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>

              <h2 className="text-2xl font-bold text-center mb-6">
                Create Account
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                  />
                  {fieldError("name")}
                </div>
                <div className="mb-4">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                  />
                  {fieldError("email")}
                </div>
                <div className="mb-4">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
                  />
                  {fieldError("password")}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-sm text-gray-500 text-center mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-teal-500 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
