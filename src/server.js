import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { findAllContacts, findContactsById } from './services/contacts.js';

const PORT = process.env.PORT || 3000;
dotenv.config();

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        targets: [
          {
            target: 'pino-pretty',
            options: { colorize: true },
          },
        ],
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await findAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await findContactsById(contactId);
    if (contact === null) {
      return res
        .status(404)
        .json({ status: 404, message: 'Contact not found', data: null });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server is running on port ${PORT}`);
  });
}
