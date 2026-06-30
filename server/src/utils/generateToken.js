import jwt from "jsonwebtoken";

const generateToken = (userId, role) => {
    const accessToken = jwt.sign(
        { userId, role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );
    
    const refreshToken = jwt.sign(
        { userId, role },
        process.env.JWT_SECRET, // Alternatively, use a separate REFRESH_SECRET
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};

export default generateToken;