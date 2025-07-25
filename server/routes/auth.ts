import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { loginSchema, registerSchema } from "../libs/validate-schema";
import { loginUser, registerUser } from "../controllers/auth-controller";

const router = Router();

router.post("/register", validateRequest({body: registerSchema}), registerUser);
router.post("/login", validateRequest({body: loginSchema}), loginUser);

export default router;
