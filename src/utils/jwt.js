import jwt from "jsonwebtoken"

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id.toString(),
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        }
    );
};

export const parseDurationToMs = (duration = "1h") => {
    const match = /^(\d+)([smhd])$/.exec(duration);
    if (!match) return 60 * 60 * 1000; // default 1h

    const value = Number(match[1]);
    const unit = match[2];
    const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };

    return value * multipliers[unit];
};