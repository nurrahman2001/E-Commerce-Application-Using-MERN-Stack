import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MotionConfig, motion } from 'framer-motion';
import Logo from '../../../assets/images/logo.png';
import { selectLoggedInUser, signupAsync, selectSignupStatus, selectSignupError, clearSignupError, resetSignupStatus } from '../AuthSlice';

export const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser && !loggedInUser?.isVerified) {
      navigate('/verify-otp');
    } else if (loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === 'fullfilled') {
      toast.success('Welcome! Verify your email to start shopping on mern-ecommerce.');
      reset();
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status]);

  const handleSignup = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(signupAsync(cred));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className=" flex justify-center items-center">
                    <img
                      src={Logo}
                      alt="NeoBuy Logo"
                      className="h-16 w-20"
                    />
                  </div>
          <p className="text-gray-500">Shop Anything</p>
        </div>
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
          <MotionConfig whileHover={{ y: -5 }}>
            <motion.div>
              <input className="w-full px-4 py-2 border rounded-md" {...register('name', { required: 'Username is required' })} placeholder="Name" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </motion.div>

            <motion.div>
              <input className="w-full px-4 py-2 border rounded-md" {...register('email', { required: 'Email is required', pattern: { value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, message: 'Enter a valid email' } })} placeholder="Email" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </motion.div>

            <motion.div>
              <input type="password" className="w-full px-4 py-2 border rounded-md" {...register('password', { required: 'Password is required', pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'At least 8 characters, with uppercase, lowercase, and a number' } })} placeholder="Password" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </motion.div>

            <motion.div>
              <input type="password" className="w-full px-4 py-2 border rounded-md" {...register('confirmPassword', { required: 'Confirm Password is required', validate: (value, fromValues) => value === fromValues.password || "Passwords don't match" })} placeholder="Confirm Password" />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </motion.div>
          </MotionConfig>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Signup</button>
          </motion.div>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm">
          <MotionConfig whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
            <motion.div>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
            </motion.div>
            <motion.div>
              <Link to="/login" className="text-blue-600 hover:underline">Already a member? <span className="font-semibold">Login</span></Link>
            </motion.div>
          </MotionConfig>
        </div>
      </div>
    </div>
  );
};
