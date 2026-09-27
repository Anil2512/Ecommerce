const db = require("../config/db");


// =============================
// GET ALL PRODUCTS
// =============================

const getProducts = (req, res) => {

    const sql = `
        SELECT *
        FROM products
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        res.status(200).json({
            products: results
        });

    });

};


// =============================
// GET SINGLE PRODUCT
// =============================

const getProductById = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT *
        FROM products
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Server error"
            });

        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.status(200).json({
            product: results[0]
        });

    });

};


// =============================
// ADD PRODUCT
// =============================


const addProduct = (req, res) => {

    const {
        name,
        category,
        price,
        old_price,
        stock,
        description,
        rating,
        image
    } = req.body;


    let imagePath = image || null;


    // FILE UPLOAD
    if (req.file) {

        imagePath =
            `/uploads/products/${req.file.filename}`;

    }


    const sql = `
        INSERT INTO products
        (
            name,
            category,
            price,
            old_price,
            stock,
            description,
            rating,
            image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            name,
            category,
            price,
            old_price,
            stock,
            description,
            rating,
            imagePath
        ],
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Product add failed"
                });

            }


            res.status(201).json({

                message:
                    "Product added successfully",

                productId:
                    result.insertId,

                image:
                    imagePath

            });

        }
    );

};


// =============================
// UPDATE PRODUCT
// =============================

const updateProduct = (req, res) => {

    const { id } = req.params;

   const {
    name,
    category,
    description,
    price
} = req.body || {};


    const sql = `
        UPDATE products
        SET
            name = ?,
            category = ?,
            description = ?,
            price = ?,
            old_price = ?,
            stock = ?,
            image = ?,
            status = ?
        WHERE id = ?
    `;


    db.query(
        sql,
        [
            name,
            category,
            description,
            price,
            old_price,
            stock,
            image,
            status,
            id
        ],
        (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Product update failed"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Product not found"
                });

            }


            res.status(200).json({

                message: "Product updated successfully"

            });

        }
    );

};


// =============================
// DELETE PRODUCT
// =============================

const deleteProduct = (req, res) => {

    const { id } = req.params;


    const sql = `
        DELETE FROM products
        WHERE id = ?
    `;


    db.query(sql, [id], (err, result) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                message: "Product deletion failed"
            });

        }


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        res.status(200).json({

            message: "Product deleted successfully"

        });

    });

};


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};