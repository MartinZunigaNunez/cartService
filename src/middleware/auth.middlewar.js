import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }


  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, "esta_es_una_clave_secreta");

    // Guardamos el usuario en el objeto request


    req.user = {
      id: decoded.id, // asumimos que el payload tiene el campo `id`
      role: decoded.role, // si quieres usar roles en el futuro
    };

    next(); // continúa al siguiente middleware/controlador
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
