import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearOtpVerificationError,
    clearResendOtpError,
    clearResendOtpSuccessMessage,
    resendOtpAsync,
    resetOtpVerificationStatus,
    resetResendOtpStatus,
    selectLoggedInUser,
    selectOtpVerificationError,
    selectOtpVerificationStatus,
    selectResendOtpError,
    selectResendOtpStatus,
    selectResendOtpSuccessMessage,
    verifyOtpAsync
} from '../AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export const OtpVerification = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(selectLoggedInUser);
    const navigate = useNavigate();
    const resendOtpStatus = useSelector(selectResendOtpStatus);
    const resendOtpError = useSelector(selectResendOtpError);
    const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);
    const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
    const otpVerificationError = useSelector(selectOtpVerificationError);

    useEffect(() => {
        if (!loggedInUser) {
            navigate('/login');
        } else if (loggedInUser?.isVerified) {
            navigate("/");
        }
    }, [loggedInUser, navigate]);

    const handleSendOtp = () => {
        dispatch(resendOtpAsync({ user: loggedInUser?._id }));
    };

    const handleVerifyOtp = (data) => {
        dispatch(verifyOtpAsync({ ...data, userId: loggedInUser?._id }));
    };

    useEffect(() => {
        if (resendOtpError) {
            toast.error(resendOtpError.message);
        }
        return () => {
            dispatch(clearResendOtpError());
        };
    }, [dispatch, resendOtpError]);

    useEffect(() => {
        if (resendOtpSuccessMessage) {
            toast.success(resendOtpSuccessMessage.message);
        }
        return () => {
            dispatch(clearResendOtpSuccessMessage());
        };
    }, [dispatch, resendOtpSuccessMessage]);

    useEffect(() => {
        if (otpVerificationError) {
            toast.error(otpVerificationError.message);
        }
        return () => {
            dispatch(clearOtpVerificationError());
        };
    }, [dispatch, otpVerificationError]);

    useEffect(() => {
        if (otpVerificationStatus === 'fulfilled') {
            toast.success("Email verified! We are happy to have you here");
            dispatch(resetResendOtpStatus());
        }
        return () => {
            dispatch(resetOtpVerificationStatus());
        };
    }, [dispatch, otpVerificationStatus]);
    

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center gap-6">
                <h2 className="text-xl font-semibold text-center">Verify Your Email Address</h2>
                {
                    resendOtpStatus === 'fullfilled' ? (
                        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(handleVerifyOtp)}>
                            <div>
                                <p className="text-gray-600">Please enter the verification code sent to</p>
                                <p className="font-semibold text-gray-800">{loggedInUser?.email}</p>
                            </div>
                            <div>
                                <input 
                                    type="number"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register("otp", { required: "Code is required", minLength: { value: 4, message: "Please enter verification code" } })}
                                />
                                {errors?.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
                            </div>
                            <button 
                                type="submit" 
                                className={`w-full py-2 rounded-md text-white font-medium ${otpVerificationStatus === 'pending' ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} 
                                disabled={otpVerificationStatus === 'pending'}
                            >
                                {otpVerificationStatus === 'pending' ? 'Verifying...' : 'Verify'}
                            </button>
                        </form>
                    ) : (
                        <>
                            <div>
                                <p className="text-gray-600">The verification code will be sent to</p>
                                <p className="font-semibold text-gray-800">{loggedInUser?.email}</p>
                            </div>
                            <button 
                                onClick={handleSendOtp} 
                                className={`w-full py-2 rounded-md text-white font-medium ${resendOtpStatus === 'pending' ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`} 
                                disabled={resendOtpStatus === 'pending'}
                            >
                                {resendOtpStatus === 'pending' ? 'Sending...' : 'Get OTP'}
                            </button>
                        </>
                    )
                }
            </div>
        </div>
    );
};
