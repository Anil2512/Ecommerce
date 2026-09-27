const OpenAI = require("openai");

const aiChat = async (req, res) => {
    try {

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { message } = req.body || {};

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const response = await client.responses.create({
            model: "gpt-5-mini",
            input: message
        });

        res.status(200).json({
            success: true,
            message: response.output_text
        });

    } catch (error) {

        console.error("AI ERROR:", error);

        res.status(500).json({
            success: false,
            message: "AI service failed",
            error: error.message
        });
    }
};

module.exports = {
    aiChat
};