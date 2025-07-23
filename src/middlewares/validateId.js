import { isValidObjectId } from 'mongoose';

export function isValidId(req, res, next) {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return res.status(400).json({ status: 400, message: 'ID is not valid' });
  }

  next();
}
