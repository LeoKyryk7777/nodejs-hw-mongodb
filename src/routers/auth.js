import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestPasswordResetController,
  resetPasswordController,
  getOAuthController,
  confirmOAuthCpntroller,
} from '../controllers/auth.controllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
  confirmOAuthSchema,
} from '../validation/auth.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));

router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post(
  '/send-reset-email',
  validateBody(requestPasswordResetSchema),
  ctrlWrapper(requestPasswordResetController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.get('/get-oauth-url', ctrlWrapper(getOAuthController));

router.post(
  '/confirm-oauth',
  validateBody(confirmOAuthSchema),
  ctrlWrapper(confirmOAuthCpntroller),
);

export default router;
