import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);



  return (
    <>
  <MainLayout>
    {!isLoggedIn ? (
      <div
        className='relative bg-cover bg-center h-screen flex items-center justify-center'
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1721936482448-1400b30b3c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGFzayUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D')`,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50 blur-lg'></div>
        <div className='relative text-center text-white z-10'>
          <h1 className='text-5xl font-bold mb-6'>
            Welcome to the Task Manager App
          </h1>
          <p className='text-xl mb-8'>
            Organize, prioritize, and complete tasks efficiently like never before.
          </p>
          <Link
            to="/login"
            className='bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg text-xl hover:bg-blue-100 transform transition-all hover:scale-105'
          >
            Join Now and Start Managing
          </Link>
          <div className="absolute bottom-4 w-full text-center text-sm">
            <p>Made with for efficient task management</p>
          </div>
        </div>
      </div>
    ) : (
      <>
        <h1 className='text-3xl mt-8 mx-8 font-semibold border-b border-gray-300 pb-4'>
          Welcome Back, {authState.user.name}!
        </h1>
        <div className="mt-6">
          <Tasks />
        </div>
      </>
    )}
  </MainLayout>
</>

  )
}

export default Home