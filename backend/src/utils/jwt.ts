import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "incubyte_secret";

export const generateToken = (
  id: string,
  email: string,
  role: string
) => {
  return jwt.sign(
    {
      id,
      email,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
