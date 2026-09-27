const db = require("../config/db");


// ===============================
// CREATE ORDER
// ===============================

const createOrder = async (req, res) => {

    const connection = await db.promise().getConnection();

    try {

        const {
            customer,
            products,
            total,
            paymentMethod
        } = req.body;


        // ===============================
        // VALIDATION
        // ===============================

        if (!customer) {

            return res.status(400).json({
                message: "Customer information is required"
            });

        }


        if (!products || products.length === 0) {

            return res.status(400).json({
                message: "Cart is empty"
            });

        }


        if (!total) {

            return res.status(400).json({
                message: "Order total is required"
            });

        }


        // ===============================
        // START TRANSACTION
        // ===============================

        await connection.beginTransaction();


        // ===============================
        // INSERT ORDER
        // ===============================

        const [orderResult] = await connection.query(

            `INSERT INTO orders
            (
                customer_name,
                customer_email,
                customer_phone,
                address,
                city,
                state,
                pincode,
                total_amount,
                payment_method,
                payment_status,
                order_status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            [
                customer.name,
                customer.email,
                customer.phone || null,
                customer.address,
                customer.city,
                customer.state,
                customer.pincode,
                total,
                paymentMethod || "cod",
                paymentMethod === "cod"
                    ? "Pending"
                    : "Pending",
                "Pending"
            ]

        );


        const orderId = orderResult.insertId;


        // ===============================
        // INSERT ORDER ITEMS
        // ===============================

        for (const product of products) {

            const subtotal =
                Number(product.price) *
                Number(product.quantity);


            await connection.query(

                `INSERT INTO order_items
                (
                    order_id,
                    product_id,
                    product_name,
                    price,
                    quantity,
                    subtotal
                )
                VALUES (?, ?, ?, ?, ?, ?)`,

                [
                    orderId,
                    product.id,
                    product.name,
                    product.price,
                    product.quantity,
                    subtotal
                ]

            );

        }


        // ===============================
        // COMMIT
        // ===============================

        await connection.commit();


        // ===============================
        // RESPONSE
        // ===============================

        res.status(201).json({

            message: "Order created successfully",

            order: {

                id: orderId,

                total: total,

                paymentMethod:
                    paymentMethod || "cod",

                status: "Pending"

            }

        });


    } catch (error) {

        // Rollback if error

        await connection.rollback();


        console.error(
            "Create Order Error:",
            error
        );


        res.status(500).json({

            message: "Server error",

            error: error.message

        });


    } finally {

        connection.release();

    }

};



// ===============================
// GET ALL ORDERS
// ===============================

const getOrders = async (req, res) => {

    try {

        const [orders] = await db.promise().query(

            `SELECT *
             FROM orders
             ORDER BY created_at DESC`

        );


        res.status(200).json({

            message: "Orders fetched successfully",

            orders

        });


    } catch (error) {

        console.error(
            "Get Orders Error:",
            error
        );


        res.status(500).json({

            message: "Server error",

            error: error.message

        });

    }

};



// ===============================
// GET SINGLE ORDER
// ===============================

const getOrderById = async (req, res) => {

    try {

        const { id } = req.params;


        const [orders] = await db.promise().query(

            `SELECT *
             FROM orders
             WHERE id = ?`,

            [id]

        );


        if (orders.length === 0) {

            return res.status(404).json({

                message: "Order not found"

            });

        }


        const [items] = await db.promise().query(

            `SELECT *
             FROM order_items
             WHERE order_id = ?`,

            [id]

        );


        res.status(200).json({

            order: orders[0],

            items

        });


    } catch (error) {

        console.error(
            "Get Order Error:",
            error
        );


        res.status(500).json({

            message: "Server error",

            error: error.message

        });

    }

};



// ===============================
// UPDATE ORDER STATUS
// ===============================

const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;


        if (!status) {

            return res.status(400).json({

                message: "Status is required"

            });

        }


        const [result] = await db.promise().query(

            `UPDATE orders
             SET order_status = ?
             WHERE id = ?`,

            [status, id]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                message: "Order not found"

            });

        }


        res.status(200).json({

            message:
                "Order status updated successfully",

            status

        });


    } catch (error) {

        console.error(
            "Update Order Error:",
            error
        );


        res.status(500).json({

            message: "Server error",

            error: error.message

        });

    }

};



module.exports = {

    createOrder,

    getOrders,

    getOrderById,

    updateOrderStatus

};