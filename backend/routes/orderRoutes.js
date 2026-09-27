const express = require("express");

const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} = require("../controllers/orderController");


const router = express.Router();


// CREATE ORDER

router.post("/", createOrder);


// GET ALL ORDERS

router.get("/", getOrders);


// GET SINGLE ORDER

router.get("/:id", getOrderById);


// UPDATE ORDER STATUS

router.put("/:id/status", updateOrderStatus);


module.exports = router;