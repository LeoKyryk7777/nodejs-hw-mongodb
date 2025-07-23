import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactControler,
  deleteContactControler,
  apdateContactControler,
} from '../controllers/contacts.js';
import { isValidId } from '../middlewares/validateId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { apdateContactSchema, contactSchema } from '../validation/contact.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  validateBody(contactSchema),
  ctrlWrapper(createContactControler),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactControler),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(apdateContactSchema),
  ctrlWrapper(apdateContactControler),
);

export default router;
