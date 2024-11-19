import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import { Contact } from './services/contacts.js';

export function setupServer() {
  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await Contact.find();

    res.send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const contacts = await Contact.findById(contactId);

    if (contacts === null) {
      return res.status(404).send({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.send({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contacts,
    });
  });

  app.use((req, res, next) => {
    res.status(404).send({ status: 404, message: 'Not found' });
  });

  try {
    const PORT = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
