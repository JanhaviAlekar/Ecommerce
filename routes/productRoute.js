import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSinlgeProductController, productCountController, productFilterController, productListController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable"
const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//delete product
router.post('/product/:pid', deleteProductController)

//get product
router.get('/get-product', getProductController)

// get single product
router.get('/get-product/:slug', getSinlgeProductController)

// get photo product
router.get('/product-photo/:pid', productPhotoController)

//deleter
router.delete('/delete-product/:pid', deleteProductController)

//product filter
router.post('/product-filter', productFilterController)

//product count
router.get('/product-count', productCountController)

//product list count
router.get('/product-list/:page', productListController)

export default router;