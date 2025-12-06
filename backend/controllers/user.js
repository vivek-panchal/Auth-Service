import TryCatch from "../middlewares/TryCatch.js";
import sanitize from "mongo-sanitize";

export const registerUser = TryCatch(async (req, res) => {
    // Registration logic here
    const { name, email, password } = sanitize(req.body);

    res.json({
        name,
        email,
        password,
    });
});