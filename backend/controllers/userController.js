const db = require("../config/db");

const getProfile = async (req, res) => {

    try {

        const [users] = await db.promise().query(
            `SELECT id, name, email, phone, role, created_at
             FROM users
             WHERE id = ?`,
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user: users[0]
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getProfile
};