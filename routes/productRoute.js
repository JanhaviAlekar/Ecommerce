import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSinlgeProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable"
const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//update product
router.post('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//delete product
router.post('/product/:pid', deleteProductController)

//get product
router.get('/get-product', getProductController)

// get single product
router.get('/get-product/:slug', getSinlgeProductController)

// get photo product
router.get('/product-photo/:pid', productPhotoController)

export default router;