const express = require("express");

const router = express.Router();

const {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const db = require("../config/db"); // apne db file ka correct path lagaye


// ======= GET ELECTRONICS PRODUCTS=======//
router.get("/electronics", (req, res) => {

    const sql = "SELECT * FROM products WHERE category = 'Electronics'";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        res.json(result);
    });
});


// =====GET ALL PRODUCTS==============//
router.get("/", getProducts);

// GET SINGLE PRODUCT
// ===============================
router.get("/:id", getProductById);


// ADD PRODUCT
// ===============================
router.post("/", addProduct);

// ===============================
// UPDATE PRODUCT
// ===============================
router.put("/:id", updateProduct);


// ==============================
// DELETE PRODUCT
// ==============================
router.delete("/:id", deleteProduct);


module.exports = router;