import { CustomError } from "../middlewares/errrorhandler.js";
import { Product } from "../models/index.js";

export const productController = {
    getall: async (req, res, next) => {
        try {
            const product = await Product.find();
            if (!product) {
                throw new CustomError("products not found!", 404);
            }
            res.status(200).json({
                status: "success",
                massage: " products find successfully",
                length: product.length,
                error: null,
                data: {
                    product,
                },
            });
        } catch (error) {
        next(error);
        console.log(error);
        }
    },  

    getone: async(req, res, next) =>{
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                throw new CustomError("product not found!", 404);
            }
            res.status(200).json({
                status: "success",
                massage: " products find successfully",
                error: null,
                data: {
                    product,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;
            const product = new Product(body)
            await product.save()

            res.json({
                status: "success",
                massage: "create new product",
                error: null,
                data: {
                    product,
                },
            });
        } catch (error) {
            next(error)
            console.log(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body
            const product = Product.findById(id)

            if(product){
                await Product.updateOne({_id: id}, body)
                return res.status(200).json({
                    status: "success",
                    massage:"update product successfully",
                    error: null,
                    data: null
                })
            }
            return next(new Error("product not found!", 404));
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            const product = Product.findById(id)

            if(product){
                await Product.deleteOne({_id: id})
                return res.status(200).json({
                    status: "success",
                    massage:"delete product successfully",
                    error: null,
                    data: null
                })
            }
            return next(new Error("product not found!", 404));
        } catch (error) {
            next(error);
        }
    }
};
