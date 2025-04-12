import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addProductAsync, resetProductAddStatus, selectProductAddStatus } from '../../products/ProductSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { GoArrowLeft } from 'react-icons/go';

export const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const productAddStatus = useSelector(selectProductAddStatus);
    const navigate = useNavigate();

    useEffect(() => {
        if (productAddStatus === 'fullfilled') {
            reset();
            toast.success("New product added");
            navigate("/admin/dashboard");
        } else if (productAddStatus === 'rejected') {
            toast.error("Error adding product, please try again later");
        }
    }, [productAddStatus, navigate, reset]);

    useEffect(() => {
        return () => {
            dispatch(resetProductAddStatus());
        };
    }, [dispatch]);

    const handleAddProduct = (data) => {
        const newProduct = { ...data, images: [data.image0, data.image1, data.image2] };
        delete newProduct.image0;
        delete newProduct.image1;
        delete newProduct.image2;
        dispatch(addProductAsync(newProduct));
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center space-x-2 p-4">
                <Link to="/admin/dashboard" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <GoArrowLeft className=" text-gray-700 text-2xl " />
                </Link>
            </div>
            <div className="flex justify-center items-center p-4">
                <form onSubmit={handleSubmit(handleAddProduct)} className="w-full max-w-4xl space-y-6 bg-white p-6 shadow-lg rounded-lg">
                    <div>
                        <label className="block text-lg font-medium">Title</label>
                        <input type="text" {...register("title", { required: "Title is required" })} className="input" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-lg font-medium">Brand</label>
                            <input {...register("brand", { required: "Brand is required" })} className="input" />
                        </div>
                        <div>
                            <label className="block text-lg font-medium">Category</label>
                            <input type="text" {...register("category", { required: "Category is required" })} className="input" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-medium">Description</label>
                        <textarea {...register("description", { required: "Description is required" })} className="input h-32"></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-lg font-medium">Price</label>
                            <input type="number" {...register("price", { required: "Price is required" })} className="input" />
                        </div>
                        <div>
                            <label className="block text-lg font-medium">Discount Percentage</label>
                            <input type="number" {...register("discountPercentage", { required: "Discount percentage is required" })} className="input" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-medium">Product Images</label>
                        <div className="space-y-2">
                            <input type="text" {...register("image0", { required: "Image is required" })} className="input" />
                            <input type="text" {...register("image1", { required: "Image is required" })} className="input" />
                            <input type="text" {...register("image2", { required: "Image is required" })} className="input" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="submit" className="btn btn-primary">Add Product</button>
                        <Link to="/admin/dashboard" className="btn btn-danger">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
