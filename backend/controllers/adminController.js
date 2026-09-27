const db = require("../config/db");

const getDashboard = async (req, res) => {

    try {

        const [users] = await db.promise().query(
            "SELECT COUNT(*) AS totalUsers FROM users"
        );

        const [products] = await db.promise().query(
            "SELECT COUNT(*) AS totalProducts FROM products"
        );

        const [orders] = await db.promise().query(
            "SELECT COUNT(*) AS totalOrders FROM orders"
        );

        res.json({
            message: "Admin Dashboard",

            stats: {
                totalUsers: users[0].totalUsers,
                totalProducts: products[0].totalProducts,
                totalOrders: orders[0].totalOrders
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getDashboard
};