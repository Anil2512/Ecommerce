const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");


// =====================================================
// EMAIL CONFIGURATION
// =====================================================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// =====================================================
// REGISTER
// =====================================================

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            password
        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Name, email and password are required"
            });

        }

        const [existingUser] = await db.promise().query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        await db.promise().query(
            `INSERT INTO users
            (name, email, phone, password)
            VALUES (?, ?, ?, ?)`,
            [
                name,
                email,
                phone,
                hashedPassword
            ]
        );

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {

        console.log("REGISTER ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


// =====================================================
// LOGIN
// =====================================================

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required"
            });

        }

        const [users] = await db.promise().query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const user = users[0];

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({

            message: "Login successful",

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }

        });

    } catch (error) {

        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


// =====================================================
// FORGOT PASSWORD - SEND OTP
// =====================================================

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({
                message: "Email is required"
            });

        }

        const [users] = await db.promise().query(
            "SELECT id, name FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const user = users[0];

        // Generate 6 digit OTP

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        // OTP expiry = 5 minutes

        const expiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        // Save OTP

        await db.promise().query(
            `UPDATE users
             SET reset_otp = ?,
                 reset_otp_expiry = ?
             WHERE id = ?`,
            [
                otp,
                expiry,
                user.id
            ]
        );

        // Send email

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Password Reset OTP",

            html: `
                <div style="font-family: Arial; padding: 20px;">

                    <h2>Password Reset</h2>

                    <p>Hello ${user.name},</p>

                    <p>
                        Your OTP for password reset is:
                    </p>

                    <h1
                        style="
                        letter-spacing: 8px;
                        color: #f59e0b;
                        "
                    >
                        ${otp}
                    </h1>

                    <p>
                        This OTP will expire in
                        <strong>5 minutes</strong>.
                    </p>

                    <p>
                        If you did not request this,
                        please ignore this email.
                    </p>

                </div>
            `

        });

        res.json({
            message: "OTP sent successfully"
        });

    } catch (error) {

        console.log("FORGOT PASSWORD ERROR:", error);

        res.status(500).json({
            message: "Failed to send OTP"
        });

    }

};


// =====================================================
// VERIFY OTP
// =====================================================

const verifyOTP = async (req, res) => {

    try {

        const {
            email,
            otp
        } = req.body;

        if (!email || !otp) {

            return res.status(400).json({
                message: "Email and OTP are required"
            });

        }

        const [users] = await db.promise().query(
            `SELECT id
             FROM users
             WHERE email = ?
             AND reset_otp = ?
             AND reset_otp_expiry > NOW()`,
            [
                email,
                otp
            ]
        );

        if (users.length === 0) {

            return res.status(400).json({
                message: "Invalid or expired OTP"
            });

        }

        res.json({
            message: "OTP verified successfully"
        });

    } catch (error) {

        console.log("VERIFY OTP ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


// =====================================================
// RESET PASSWORD
// =====================================================

const resetPassword = async (req, res) => {

    try {

        const {
            email,
            otp,
            password
        } = req.body;

        if (!email || !otp || !password) {

            return res.status(400).json({
                message: "Email, OTP and password are required"
            });

        }

        const [users] = await db.promise().query(
            `SELECT id
             FROM users
             WHERE email = ?
             AND reset_otp = ?
             AND reset_otp_expiry > NOW()`,
            [
                email,
                otp
            ]
        );

        if (users.length === 0) {

            return res.status(400).json({
                message: "Invalid or expired OTP"
            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        await db.promise().query(
            `UPDATE users
             SET password = ?,
                 reset_otp = NULL,
                 reset_otp_expiry = NULL
             WHERE id = ?`,
            [
                hashedPassword,
                users[0].id
            ]
        );

        res.json({
            message: "Password reset successfully"
        });

    } catch (error) {

        console.log("RESET PASSWORD ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    register,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword
};