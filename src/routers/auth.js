import express from 'express';
import { validateBody } from '../middlewares/validateaBody.js';
import { ctrlWrapper } from '../utils/ctrlWrraper.js';
import { registerSchema, loginSchema } from '../validation/auth.js';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
} from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshController));

export default router;
