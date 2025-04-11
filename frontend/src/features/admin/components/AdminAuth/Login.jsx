import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Logo from '../../../../assets/images/logo.png';
import {
  selectLoggedInUser,
  loginAsync,
  selectLoginStatus,
  selectLoginError,
  clearLoginError,
  resetLoginStatus
} from './AdminAuthSlice';

export const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const loggedInAdmin = useSelector(selectLoggedInUser);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInAdmin && loggedInAdmin?.isVerified) {
      navigate('/admin/login');
    } else if (loggedInAdmin && !loggedInAdmin?.isVerified) {
      navigate('/admin-verify-otp');
    }
  }, [loggedInAdmin, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === 'fullfilled' && loggedInAdmin?.isVerified === true) {
      toast.success('Login successful');
      navigate('/admin/dashboard');
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status, loggedInAdmin, dispatch, navigate]);

  const handleLogin = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(loginAsync(cred));
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 sm:w-96 text-center">
        <div className=" flex justify-center items-center">
          <img
            src={Logo}
            alt="NeoBuy Logo"
            className="h-16 w-20"
          />
        </div>
        <p className="text-gray-500 text-sm">Admin Login</p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <motion.div whileHover={{ y: -5 }}>
            <input
              {...register('email', { required: 'Email is required', pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/, message: 'Enter a valid email' } })}
              placeholder='Email'
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </motion.div>
          <motion.div whileHover={{ y: -5 }}>
            <input
              type='password'
              {...register('password', { required: 'Password is required' })}
              placeholder='Password'
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <button
              type='submit'
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
              disabled={status === 'pending'}
            >
              {status === 'pending' ? 'Logging in...' : 'Login'}
            </button>
          </motion.div>
          <div className="flex justify-between items-center flex-wrap">
            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
              <Link to='/forgot-password' className="text-blue-600 hover:underline">Forgot password?</Link>
            </motion.div>
            <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
              <Link to='/admin/signup' className="text-blue-600 hover:underline">Don't have an account? <span className="font-bold">Register</span></Link>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};
