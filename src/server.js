import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const isDev = process.env.NODE_ENV !== 'production';
  app.use(
    pino(
      isDev
        ? {
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            },
          }
        : undefined, // В production транспорт не используется
    ),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const contacts = await getContactById(contactId);

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

  app.use('*', (req, res, next) => {
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
