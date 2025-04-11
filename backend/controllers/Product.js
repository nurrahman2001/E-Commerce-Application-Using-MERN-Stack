const { Schema, default: mongoose } = require("mongoose")
const Product=require("../models/Product")

exports.create=async(req,res)=>{
    try {
        const created=new Product(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding product, please trying again later'})
    }
}

exports.getAll = async (req, res) => {
    try {
        const filter = {};
        const sort = {};
        let skip = 0;
        let limit = 0;
        

        // Filtering by category if requested
        if (req.query.category) {
            const categories = Array.isArray(req.query.category) ? req.query.category : req.query.category.split(",");
            filter["category.name"] = { $in: categories };
        }

        // Filtering out deleted products if requested
        if (req.query.user) {
            filter.isDeleted = false;
        }

        // Sorting logic
        if (req.query.sort) {
            sort[req.query.sort] = req.query.order === "asc" ? 1 : -1;
        }

        // Pagination logic
        if (req.query.page && req.query.limit) {
            const pageSize = parseInt(req.query.limit, 10) || 10;
            const page = parseInt(req.query.page, 10) || 1;

            skip = pageSize * (page - 1);
            limit = pageSize;
        }

        // Get total count before applying limit
        const totalDocs = await Product.countDocuments(filter).exec();

        // Fetch filtered & paginated results
        const results = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();

        // Set total count header
        res.set("X-Total-Count", totalDocs);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products, please try again latttttter" });
    }
};


exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const result=await Product.findById(id).populate("category")
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting product details, please try again later'})
    }
}
exports.getByKeyword=async(req,res)=>{
    try {
        const {query}=req.query
        const result=await Product.find({title:{$regex:query,$options:'i'}})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error searching product, please try again later'})
    }
}

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating product, please try again later'})
    }
}

exports.undeleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const unDeleted=await Product.findByIdAndUpdate(id,{isDeleted:false},{new:true}).populate('brand')
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error restoring product, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Product.findByIdAndUpdate(id,{isDeleted:true},{new:true}).populate("brand")
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting product, please try again later'})
    }
}


