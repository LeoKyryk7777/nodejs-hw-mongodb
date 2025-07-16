import { Router } from 'express';
import {
  getContactByIdController,
  getContactsController,
  createContactControler,
  deleteContactControler,
  apdateContactControler,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactControler));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactControler));
router.patch('/contacts/:contactId', ctrlWrapper(apdateContactControler));

export default router;
