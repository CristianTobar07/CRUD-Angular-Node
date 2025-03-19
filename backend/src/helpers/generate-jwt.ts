import jwt from "jsonwebtoken";

export const generateJWT = (uid: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_KEY!,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
